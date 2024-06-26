import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDbQuerys } from "../lib/react-query/db-querys";

export const UserAccept = () => {
  const { id } = useParams();
  //   const { mutate } = useDbQuerys().useAcceptRequest();
  const { useAcceptRequestMutation } = useDbQuerys();
  const { mutate } = useAcceptRequestMutation();

  useEffect(() => {
    if (id) {
      mutate(id);
    }
  }, [id, mutate]);
};
