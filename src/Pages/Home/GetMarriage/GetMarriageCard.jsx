const GetMarriageCard = ({ story }) => {
  const { coupleImage, sharedFeelings,selfBioId,partnerBioId } = story;
  return (
    <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <img
        className="object-cover w-full h-64"
        src={coupleImage}
        alt="Article"
      />

      <div className="p-6">
        <div>
          <div className="flex justify-between font-semibold">
            <p>Marriage Date: 8-11-2022</p>
            <p>Review: 5</p>
          </div>
          <hr className="my-4"/>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {sharedFeelings}
          </p>
          <hr className="my-4"/>
          <p>Paired ID: ({`${selfBioId} || ${partnerBioId}`})</p>
        </div>
      </div>
    </div>
  );
};

export default GetMarriageCard;
