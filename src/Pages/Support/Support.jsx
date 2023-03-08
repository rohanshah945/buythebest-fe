import React from "react";

import "./Support.css";

function Support() {
  return (
    <div className="support">
      <div className="support__title">Support</div>
      <hr className="support_divider" />
      <div className="support__form">
        <div className="support__formTitle">
          Send an email to us for enquiries or issues with an order
        </div>
        <div className="support__formField">
          <span className="support__formLabel">{`Name`}</span>{" "}
          <input className="support__formInput" />
        </div>

        <div className="support__formField">
          <span className="support__formLabel">{`Email`}</span>{" "}
          <input className="support__formInput" />
        </div>

        <div className="support__formField">
          <span className="support__formLabel">{`Subject`}</span>{" "}
          <input className="support__formInput" />
        </div>

        <div className="support__formField">
          <span className="support__formLabel">Message</span>
          <textarea className="support__formInput h-32"></textarea>
        </div>

        <div className="support__formField">
          <button className="support__formSubmit bg-blue-500">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Support;
