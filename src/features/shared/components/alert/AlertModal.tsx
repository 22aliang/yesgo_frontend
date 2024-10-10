import React from 'react';

interface AlertModalProps {
  message: string;
  state: number;
  showModal: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  message,
  state,
  showModal,
}) => {
  let icon = null;

  // Determine which icon to show based on the state
  if (state === 200 || state === 201) {
    icon = (
      <div className="ui ui-success">
        <svg viewBox="0 0 87 87" version="1.1" className="w-7 h-7">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(2, 2)">
              <circle
                stroke="rgba(165, 220, 134, 0.2)"
                strokeWidth="4"
                cx="41.5"
                cy="41.5"
                r="41.5"
              ></circle>
              <circle
                className="ui-success-circle"
                stroke="#A5DC86"
                strokeWidth="4"
                cx="41.5"
                cy="41.5"
                r="41.5"
              ></circle>
              <polyline
                className="ui-success-path"
                stroke="#A5DC86"
                strokeWidth="4"
                points="19 38.8 31.1 54.8 63.3 28"
              ></polyline>
            </g>
          </g>
        </svg>
      </div>
    );
  } else {
    icon = (
      <div className="ui ui-error">
        <svg viewBox="0 0 87 87" version="1.1" className="w-7 h-7">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(2, 2)">
              <circle
                stroke="rgba(252, 191, 191, .5)"
                strokeWidth="4"
                cx="41.5"
                cy="41.5"
                r="41.5"
              ></circle>
              <circle
                className="ui-error-circle"
                stroke="#F74444"
                strokeWidth="4"
                cx="41.5"
                cy="41.5"
                r="41.5"
              ></circle>
              <path
                className="ui-error-line1"
                d="M22.24,22 L60.43,60.18"
                stroke="#F74444"
                strokeWidth="3"
                strokeLinecap="square"
              ></path>
              <path
                className="ui-error-line2"
                d="M60.75,21 L23.24,59.84"
                stroke="#F74444"
                strokeWidth="3"
                strokeLinecap="square"
              ></path>
            </g>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <div className="modal alertModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="mr-3">{icon}</div>
                <h5>{message}</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertModal;
