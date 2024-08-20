import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import io from "socket.io-client";
import { Button, Stack, TextField } from "@mui/material";
import EmojiPicker from "emoji-picker-react";

import "./style.css";
import emojiIcon from "../../assets/images/emoji-icon.svg";
import { Messages } from "../Messages";
import { Menu } from "../Menu";

const socket = io.connect("http://localhost:5000");
const MESSAGE = "message";

export const Chat = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [params, setParams] = useState("");
  const [showEmojiField, setShowEmojiField] = useState(false);
  const [users, setUsers] = useState([]);

  const { handleSubmit, register, watch, setValue, reset } = useForm();

  const onSubmit = ({ message }) => {
    socket.emit("sendMessage", { message, params });
    reset();
  };

  const onEmojiClick = ({ emoji }) => {
    const message = watch(MESSAGE);
    setValue(MESSAGE, `${message ?? ""}${emoji}`);
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", { params });
    navigate("/");
  };

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);

    socket.on("message", ({ data }) => {
      setState((prev) => {
        const isExist = prev.some(
          (p) => JSON.stringify(p) === JSON.stringify(data)
        );

        return isExist ? prev : [...prev, data];
      });
    });
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((prev) => {
        const isExist = prev.some(
          (p) => JSON.stringify(p) === JSON.stringify(data)
        );

        return isExist ? prev : [...prev, data];
      });
    });
  }, []);

  useEffect(() => {
    socket.on('room', ({ data: { users } }) => {
      setUsers(users);
    });
  }, []);

  return (
    <Stack
      direction={"row"}
      className="chat"
    >
      <Menu users={users} clickBtn={leaveRoom} />
      
      <Stack width={'100%'}>
        <Stack className="chat-main">
          {state.map((user, i) => (
            <Messages
              key={i}
              user={user}
              isCurrentUser={
                params.name.trim().toLowerCase() ===
                user.name.trim().toLowerCase()
              }
            />
          ))}
        </Stack>

        <Stack
          component={"form"}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"15px"}
          onSubmit={handleSubmit(onSubmit)}
          className="chat-footer footer"
        >
          <TextField
            placeholder="Enter your message"
            sx={{ width: "100%" }}
            autoComplete="off"
            {...register(MESSAGE, { required: true })}
          />
          <Stack
            alignItems={'center'}
            justifyContent={'center'}
            className="icon_wrapper"
          >
            <img
              src={emojiIcon}
              alt="emoji"
              onClick={() => setShowEmojiField(!showEmojiField)}
              className="icon"
            />

            {showEmojiField && (
              <Stack
                className="emoji_field"
                justifyContent={"flex-end"}
                alignItems={"flex-end"}
              >
                <EmojiPicker
                  pickerStyle={{ width: "100%" }}
                  onEmojiClick={onEmojiClick}
                />
              </Stack>
            )}
          </Stack>
          <Button
            type="submit"
            variant="contained"
            disabled={!watch(MESSAGE)}
            className="btn"
          >
            Send a message
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
