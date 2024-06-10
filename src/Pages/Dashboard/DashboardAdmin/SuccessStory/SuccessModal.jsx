import { Modal } from "flowbite-react";

const SuccessModal = ({ openModal, setOpenModal, specificStory }) => {
  // console.log(specificStory);
  const { selfBioId, partnerBioId, coupleImage, sharedFeelings } =
    specificStory;
  return (
    <div>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Success Story</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <img src={coupleImage} alt="" />
            </div>
            <div>
              <div className="flex gap-6">
                <p className="text-lg font-semibold">
                  Male Biodata ID: {selfBioId}
                </p>
                <p className="text-lg font-semibold">
                  Female Biodata ID: {partnerBioId}
                </p>
              </div>
              <p className="mt-4">{sharedFeelings}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SuccessModal;
