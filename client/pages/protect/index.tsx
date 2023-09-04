import BoardsList from "@/app/Components/Boards/BoardsList";
import CasesList from "@/app/Components/Cases/CasesList";
import Navbar from "@/app/Components/NavBar";

const sampleCases = [
  { Id: 1, Preview: "/caseImage.png", caseName: "Case 1" },
  { Id: 2, Preview: "/caseImage.png", caseName: "Case 2" },
  // ... add more cases as needed
];

const sampleBoards = [
  {
    Id: 1,
    Preview: "/caseImage.png",
    boardName: "Board 1",
    caseName: "Case 1",
  },
  {
    Id: 2,
    Preview: "/caseImage.png",
    boardName: "Board 2",
    caseName: "Case 2",
  },
  // ... add more boards as needed
];

const DashboardPage = () => {
  return (
    <div className="min-w-screen flex min-h-screen flex-col bg-grey-light">
      <Navbar pageName="Dashboard" />
      <CasesList />
    </div>
  );
};

export default DashboardPage;
