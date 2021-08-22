import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="d-flex align-items-start">
      <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button className="btn btn-outline-info" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"> <Link to="/">Home</Link></button>
        <br></br>
        <button className="btn btn-outline-info" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false"><Link to="/components">Components</Link></button>
        <br></br>
        <button className="btn btn-outline-info" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false"><Link to="/counter">Counter</Link></button>
        <br></br>
        <button className="btn btn-outline-info" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"><Link to="/calculator">Calculator</Link></button>
        <br></br>
        <button className="btn btn-outline-info" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"><Link to="/generator">Generator</Link></button>
        <br></br>
        <button className="btn btn-outline-info" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"><Link to="/bootstrap">BootStrap</Link></button>
      </div>
    </div>
  )
};

export default Navigation;