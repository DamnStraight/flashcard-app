import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { boxShadowMixin } from "../../styles/mixins";
import { motion } from "framer-motion";
import { useQuery } from "urql";
import { getSubjectsQuery } from "../../graphql/Subject/queries";
import { useHistory } from "react-router-dom";

const fakeData = [
  { subject: "C++" },
  { subject: "C" },
  { subject: "Python" },
  { subject: "Arraylist" },
  { subject: "Linked Lists" }
];

const StyledList = styled.ul`
  background-color: #fafafa;
  border-radius: 4px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: center;
  ${boxShadowMixin}
`;

const StyledEntry = styled.li`
  padding: 10px 0px;
  color: #212121;
  border-bottom: 1px solid #e0e0e0;
  width: 400px;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    font-size: 16px;
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom: none;
  }
`;

type Props = {};

const SubjectPicker: React.FC<Props> = () => {
  const [getSubjectsRes] = useQuery({
    query: getSubjectsQuery
  });

  const history = useHistory();

  const redirect = (subjectId: string) => history.push(`/list/${subjectId}`);

  return (
    <StyledList>
      {getSubjectsRes?.data?.getAll &&
        getSubjectsRes.data.getAll.map((item: any, index: any) => (
          <StyledEntry onClick={() => redirect(item.id)} key={`li-${index}`}>{item.subject}</StyledEntry>
        ))}
    </StyledList>
  );
};

export default SubjectPicker;
