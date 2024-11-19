import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { messageService } from '../service/messageService';

Modal.setAppElement('#__next');

interface MessageModalProps {
  isOpen: boolean;
  receiver_id: number;
  onRequestClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  receiver_id,
  onRequestClose,
}) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    await messageService.directSendMessage(receiver_id, message);
    setMessage('');
    onRequestClose();
    toast.success('message send successfully!');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Send Message"
      className="modal w-full md:w-1/2"
      overlayClassName="overlay"
    >
      <h2 className="text-xl font-semibold mb-4">發送訊息</h2>
      <textarea
        className="w-full h-32 p-2 border border-gray-300 rounded-lg"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="輸入您的訊息..."
      />
      <div className="flex justify-end mt-4">
        <button className="btn mr-2" onClick={onRequestClose}>
          取消
        </button>
        <button className="btn" onClick={handleSendMessage}>
          送出
        </button>
      </div>
    </Modal>
  );
};

export default MessageModal;
