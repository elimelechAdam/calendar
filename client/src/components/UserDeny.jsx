import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDbQuerys } from "../lib/react-query/db-querys";

export const UserDeny = () => {
  const { id } = useParams();
  //   const { mutate } = useDbQuerys().useAcceptRequest();
  const { useDenyRequestMutation } = useDbQuerys();
  const { mutate } = useDenyRequestMutation();

  useEffect(() => {
    if (id) {
      mutate(id);
    }
  }, [id, mutate]);
};
