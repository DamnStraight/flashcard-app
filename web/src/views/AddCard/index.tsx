import { EditableText, HTMLSelect } from "@blueprintjs/core";
import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import styled from "styled-components";
import { useMutation, useQuery } from "urql";
import Card from "../../components/Card";
import { StyledButton } from "../../components/StyledButton";
import { addFlashCardMutation } from "../../graphql/Subject/mutations";
import { getSubjectsQuery } from "../../graphql/Subject/queries";
import { useHistory } from "react-router-dom";

import "./AddCard.scss";
import "../../styles/prism-monokai.scss";

/**
 * NOTE Order of imports here is important!
 */
// @ts-ignore
import { highlight } from "prismjs/components/prism-core";
// @ts-ignore
import { languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

const StyledSelect = styled(HTMLSelect)`
  background: white;
  border-bottom: 2px solid #e0e0e0;
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  border-radius: 4px;
`;

const defaultCode = `// Maybe add some code?
const multiply = (a) => (b) => (c) => a * b * c;
`;

const AddCard = () => {
  const [solution, setSolution] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [subjectId, setSubjectId] = useState<number>(-1);
  const [code, setCode] = useState<string>(defaultCode);
  const history = useHistory();

  const [getSubjectsRes] = useQuery({
    query: getSubjectsQuery
  });

  const [addFlashCardRes, executeAddFlashCard] = useMutation(
    addFlashCardMutation
  );

  return (
    <>
      <div>
        <StyledButton onClick={() => history.push("/")}>GO BACK</StyledButton>
      </div>
      <Card>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <StyledSelect
            value={subjectId}
            onChange={event => setSubjectId(Number(event.target.value))}
            className="bp3-minimal"
          >
            {!getSubjectsRes.fetching &&
              getSubjectsRes.data?.getAll.map((item: any, index: number) => (
                <option key={`opt-${index}`} value={item.id}>
                  {item.subject}
                </option>
              ))}
            <option value={-1} disabled>
              Select a Subject
            </option>
          </StyledSelect>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>
            <EditableText
              placeholder="Add a question..."
              value={question}
              onChange={question => setQuestion(question)}
            />
          </h2>
        </div>
        <div>
          <EditableText
            className="solution-textarea"
            maxLines={12}
            minLines={3}
            multiline={true}
            placeholder="Add a solution..."
            onChange={solution => setSolution(solution)}
            value={solution}
          />
        </div>

        <div className="code-editor-wrapper">
          <Editor
            className="code-editor"
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
          />
        </div>
        <div style={{ textAlign: "center", padding: "40px 0px 0px 0px" }}>
          <StyledButton
            disabled={getSubjectsRes.fetching || addFlashCardRes.fetching}
            onClick={async () =>
              executeAddFlashCard({ subjectId, question, solution })
            }
          >
            SUBMIT
          </StyledButton>
        </div>
      </Card>
    </>
  );
};

export default AddCard;
