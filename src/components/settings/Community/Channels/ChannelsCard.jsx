import { useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import BtnChange from "../../BtnChange";
import Card from "../../../Card";
import Channel from "./Channel";
import UpgradeCard from "../../../Pro/UpgradeCard";
import ChannelForm from "./ChannelForm"; // Create a ChannelForm component for the form
import AddIcon from "@mui/icons-material/Add";

export default function ChannelsCard({ creatorCommunity, setLoading }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  // console.log(creatorCommunity);
  const [isAddingChannel, setIsAddingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [channels, setChannels] = useState([
    { title: "General", isActive: false },
    ...(creatorCommunity?.channels || []),
  ]); // Assuming channels is your array of channels
  const isProUser = false;
  const channelLimit = isProUser ? 5 : 1;
  // Function to handle the API call
  const addChannelToCommunity = async (channelName) => {
    console.log("id:", creatorCommunity?._id, "channel:", channelName);
    const response = await fetch(
      `/api/communities/${creatorCommunity?._id}/channels`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: channelName }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      // Handle error case
      console.error("Failed to add channel");
      return null;
    }
  };

  // Function to delete a channel from a community
  const deleteChannelFromCommunity = async (channelId) => {
    const response = await fetch(
      `/api/communities/${creatorCommunity?._id}/channels/${channelId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log("Channel deleted successfully");
      return true;
    } else {
      // Handle error case
      console.error("Failed to delete channel");
      return false;
    }
  };

  const handleSaveChannel = async () => {
    if (channels.length > channelLimit) {
      setSnackbar({
        open: true,
        message: `You have reached the channel limit${
          isProUser ? "" : " for free users"
        }.`,
        severity: "error",
      });
      return;
    }
    setLoading(true);
    const newChannel = await addChannelToCommunity(newChannelName);
    console.log("newChannel:", newChannel);
    if (newChannel) {
      setChannels((prevChannels) => [...prevChannels, newChannel]);
      setIsAddingChannel(false);
      setNewChannelName("");
      setLoading(false);
      setSnackbar({
        open: true,
        message: `Channel created successfully!`,
        severity: "success",
      });
    }
  };

  const handleDeleteChannel = async (channelId) => {
    setLoading(true);

    const success = await deleteChannelFromCommunity(channelId);

    if (success) {
      // If the API call was successful, remove the channel from local state
      setChannels((prevChannels) =>
        prevChannels.filter((channel) => channel._id !== channelId)
      );
      setLoading(false);
      setSnackbar({
        open: true,
        message: `Channel deleted successfully!`,
        severity: "success",
      });
    }
  };

  const handleAddChannelClick = () => {
    setIsAddingChannel(true);
  };

  const handleCancelForm = () => {
    // Reset state
    setIsAddingChannel(false);
  };

  return (
    <Card title={"Channels"}>
      <Box className="flex flex-col gap-6 ">
        {channels.map((channel, index) => (
          <Channel
            key={index}
            label={channel.title}
            isActive={channel.isActive}
            handleDeleteChannel={() => handleDeleteChannel(channel._id)}
          />
        ))}
      </Box>
      <ChannelForm
        value={newChannelName}
        onChange={(e) => setNewChannelName(e.target.value)}
        onSave={handleSaveChannel}
        isAddingChannel={isAddingChannel}
        onCancel={handleCancelForm}
      />
      {!isAddingChannel && (
        <Box className="w-full text-center mob:mb-6 tab:mb-8 mob:mt-6 tab:mt-8">
          <BtnChange icon={<AddIcon />} onClick={handleAddChannelClick}>
            Add a Channel
          </BtnChange>
        </Box>
      )}
      <UpgradeCard />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        sx={{
          borderRadius: "0",
          backgroundColor: "#eaeaea",
        }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: "0",
            "&.MuiAlert-standardSuccess": { color: "rgb(30, 70, 32)" },
            color: "#ff3333",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
