import React from "react";
import { Link, useLocation } from "react-router-dom";
import * as Tooltip from "@radix-ui/react-tooltip";

function Write() {
  const location = useLocation();
  return (
    <div className="fixed bottom-10 z-[100000] right-3">
      {!location.pathname.includes("/blog/new") && !location.pathname.includes("/blog/edit") && (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Link to={`blog/new`}>
                <span className="px-3.5 py-2.5 text-lg shadow-xl text-sky-800 bg-sky-300 rounded-full">
                  <i class="fas fa-edit"></i>
                </span>
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade  data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-sky-600 border  border-sky-200 bg-sky-100 select-none rounded-[4px]  px-[15px] py-[10px] text-[15px] leading-none  will-change-[transform,opacity]"
                side="left"
                sideOffset={5}
              >
               Create New Blog
                <Tooltip.Arrow className="fill-blue-300" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>
  );
}

export default Write;
