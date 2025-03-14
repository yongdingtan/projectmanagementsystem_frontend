import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { acceptInvitationToProject } from "../../redux/project/action";

const AcceptInvitation = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            navigate("/invitation-error"); // Handle missing token
            return;
        }

        dispatch(acceptInvitationToProject({ invitationToken: token, navigate }));

    }, [searchParams, dispatch, navigate]);

    return <p>Processing invitation...</p>;
};

export default AcceptInvitation;
