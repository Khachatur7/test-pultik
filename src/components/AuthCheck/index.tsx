import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';

interface Props {
    children: React.ReactNode;
}

const AuthCheck: React.FC<Props> = ({
    children
}) => {

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getUser = useAuthStore((state) => state.getUser);
    const navigate = useNavigate();

    useEffect(() => {
        (async function(){
            setIsLoading(true);
            const res = await getUser();
            setIsLoading(false);
            if (res) {
                return setIsError(false);
            }

            navigate("/auth");

        }())
    }, []);

    if (isError || isLoading) {
        return <></>;
    }

    return (
        <>{children}</>
    )
}

export default AuthCheck