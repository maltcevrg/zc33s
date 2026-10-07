import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FAQ_MODULE_REDIRECTS } from '../data/knowledge';

function FaqRedirect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const moduleNum = searchParams.get('module');
    if (moduleNum && FAQ_MODULE_REDIRECTS[moduleNum]) {
      navigate(FAQ_MODULE_REDIRECTS[moduleNum], { replace: true });
    } else {
      navigate('/knowledge', { replace: true });
    }
  }, [searchParams, navigate]);

  return null;
}

export default FaqRedirect;
