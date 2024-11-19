import { NextPageContext } from 'next';
import { ErrorProps } from 'next/error';

function Error({ statusCode }: ErrorProps) {
  return (
    <p>
      {statusCode
        ? `伺服器錯誤: ${statusCode}`
        : '發生了一個客戶端錯誤，請稍後再試。'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
