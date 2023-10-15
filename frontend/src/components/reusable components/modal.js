import React from "react";

export default function Modal({btnName,title,onSubmit,toggle,children}) {
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#${toggle}`}
      >
        {btnName}
      </button>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id={toggle}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                {title}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">{children}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary"  data-dismiss="modal" onClick={onSubmit}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
