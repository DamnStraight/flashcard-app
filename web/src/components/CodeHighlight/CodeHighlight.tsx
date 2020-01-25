import React, { useEffect, useRef, useState } from "react";

import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";

type Props = {
  language: string;
  children: string;
};

interface LanguageContainer {
  [key: string]: boolean;
}

const registeredLanguages: LanguageContainer = {};

const CodeHighlight: React.FC<Props> = ({ language, children }) => {
  const [loaded, setLoaded] = useState(false);
  const codeNode: React.RefObject<HTMLElement> = useRef(null);

  useEffect(() => {
    const highlight = () => {
      codeNode && codeNode.current && hljs.highlightBlock(codeNode.current);
      setLoaded(true);
    };

    if (loaded && !registeredLanguages[language]) {
      try {
        const newLanguage = require(`highlight.js/lib/languages/${language}`);
        hljs.registerLanguage(language, newLanguage);
        registeredLanguages[language] = true;
        highlight();
      } catch (err) {
        console.log(err);
      }
    } else {
      highlight();
    }
  });

  return loaded ? (
    <pre>
      <code style={{ borderRadius: "4px" }} ref={codeNode} className={language}>
        {children}
      </code>
    </pre>
  ) : (
    <p>loading lol</p>
  );
};

export default CodeHighlight;
