import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "./features/appSlice";
import "./SidebarChannel.css";
// import IconButton from "@material-ui/core/IconButton";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import { Menu, MenuItem } from "@material-ui/core";
// import axios from "./axios";
import Pusher from "pusher-js";

const pusher = new Pusher("2c85310c5ba9cfaac9e1", {
  cluster: "ap2",
});

function SidebarChannel({ id, channelName }) {
  // const options = ["delete"];
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   axios.delete(`/delete/channel/${id}`);
  //   setAnchorEl(null);
  //   const deleteChannel = pusher.subscribe("channels");
  //   deleteChannel.bind("deleteChannel", function (data) {});
  // };

  const dispatch = useDispatch();
  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channelName,
          })
        )
      }>
      <div className="sidebarChannel__head">
        <h4>
          <span className="sidebarChannel__hash">#</span>
          {channelName}
        </h4>
      </div>
      {/* <div className="sidebarChannel__icon">
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
          {options.map((option) => (
            <MenuItem key={option} onClick={handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div> */}
    </div>
  );
}

export default SidebarChannel;
