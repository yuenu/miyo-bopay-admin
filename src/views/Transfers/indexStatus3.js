import TransferTypes from "./indexTemplate";
import { useSelector } from "react-redux";
import { selectAuth } from "@/store/slice/auth";

const Transfer = () => {
  const { user } = useSelector(selectAuth);

  return <TransferTypes params={{ status: 3, approver_id: user.id }} />;
};
export default Transfer;
