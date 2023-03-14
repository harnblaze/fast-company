import React, { FC } from "react";
import UserCard from "../../ui/UserCard";
import MeetingsCard from "../../ui/MeetingsCard";
import CommentsCard from "../../ui/CommentsCard";
import { useUser } from "../../../hooks/useUsers";
import QualitiesCard from "../../ui/QualitiesCard";
import CommentsProvider from "../../../hooks/useComments";

interface IUserPageProps {
  id: string;
}
const UserPage: FC<IUserPageProps> = ({ id }) => {
  const { getUserById } = useUser();
  const user = getUserById(id);
  if (user === undefined) return <h1>loading...</h1>;
  return (
    <>
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard meetings={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <CommentsProvider>
              <CommentsCard />
            </CommentsProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
