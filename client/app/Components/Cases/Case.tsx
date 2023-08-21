import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Cases } from "forensic-server";

interface ICaseProps {
  caseData: Cases;
}

const Case = ({ caseData }: ICaseProps) => {
  let bgColor;
  let centralMessage;

  if (caseData.managerUserId) {
    bgColor = "bg-white";
  } else {
    if (caseData.invitation && caseData.invitation.status === "pending") {
      bgColor = "bg-blue-light";
      centralMessage = "Waiting for User";
    } else {
      bgColor = "bg-yellow-default";
      centralMessage = "User refused invitation";
    }
  }

  return (
    <div
      className={`relative h-[150px] w-[200px] rounded-lg ${bgColor} shadow-md transition-shadow duration-200 hover:shadow-lg`}
    >
      {centralMessage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-medium text-white">{centralMessage}</span>
        </div>
      )}

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded bg-black bg-opacity-50 px-2 font-medium text-white">
        {caseData.caseName} - {caseData.caseNumber}
      </p>

      <FontAwesomeIcon
        icon={faCog}
        size="lg"
        className="absolute right-2 top-2 cursor-pointer text-grey-dark"
      />
    </div>
  );
};

export default Case;
