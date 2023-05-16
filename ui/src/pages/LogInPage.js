import iyteLogo from "../components/nav-bar-pictures/iytelogo.png";
const LogInPage = () => {
  return (
    <div className="grid grid-cols-2 gap-4 ">
      <div></div>
      <div className="place-self-end bg-gray-100 w-80 py-20 ml-16">
        <img src={iyteLogo} className="w-40 h-40 ml-12 mr-12"></img>
        <form className="mb-72">
          <input
            type="text"
            placeholder="Enter a email"
            className="mt-12 ml-12"
          />
          <input
            type="text"
            placeholder="Enter a password"
            className="mt-4 ml-12"
          />
          <button className="mt-8 ml-12 mb-12 w-40 h-10 border-rose-700 border-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
