import React, { FC, useEffect, useState } from "react";
import { IUser } from "../../../api/fake.api/user.api";
import api from "../../../api";
import UserCard from "../../ui/UserCard";
import MeetingsCard from "../../ui/MeetingsCard";
import CommentsCard from "../../ui/CommentsCard";

interface IUserPageProps {
  id: string;
}
const UserPage: FC<IUserPageProps> = ({ id }) => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    api.users
      .getById(id)
      .then((data) => setUser(data))
      .catch((e) => console.log(e));
  }, []);

  if (user === undefined) return <h1>loading...</h1>;

  return (
    <>
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            {/* <QualitiesCard qualities={user.qualities} /> */}
            <MeetingsCard meetings={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <CommentsCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
