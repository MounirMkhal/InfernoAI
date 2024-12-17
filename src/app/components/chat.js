"use client";

import {
  Box,
  TextField,
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  CssBaseline,
  Stack,
} from "@mui/material";
import { useChat } from "ai/react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { avatarImg } from "../../data/index";
import "@fontsource/roboto";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/chat",
    onError: (e) => {
      console.log(e);
    },
  });

  const [initialMessages, setInitialMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content: "Welcome to the abyss, where shadows whisper your name... What unholy knowledge do you seek?",
    },
  ]);

  // Combine initialMessages with any new messages
  const combinedMessages = [...initialMessages, ...messages];

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundImage: 'url("https://cdn.discordapp.com/attachments/1318109419585671249/1318371894306672680/3d-grunge-room-interior-with-spotlight-smoky-atmosphere-background.jpg?ex=67621501&is=6760c381&hm=247504ea86167013008bcbec2761614e44516d1d4c13041357fb5b0a169b3cdc&")',
          backgroundSize: "fill",
          backgroundPosition: "center",
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <Container sx={{ flexGrow: 1, py: 3 }}>
          <Stack
            direction={"column"}
            spacing={2}
            flexGrow={1}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.8)",
              borderRadius: 2,
              boxShadow: 3,
              overflow: "hidden",
              height: "100%",
              maxHeight: "100%",
            }}
          >
            <Box sx={{ overflowY: "auto", px: 3, py: 2, flexGrow: 1, backgroundImage: 'url("https://cdn.discordapp.com/attachments/1318109419585671249/1318374907704512592/das-gigapixel-standard-scale-4_00x.png?ex=676217d0&is=6760c650&hm=210f426f9064ce0ec44df65d74be1e71a92b36dc134069605d1017f4fb2a0336&")', }}>
              {combinedMessages.map((message, index) => {
                const isUser = message.role === "user";
                return (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="flex-start"
                    justifyContent={isUser ? "flex-end" : "flex-start"}
                    sx={{
                      mb: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                        backgroundImage: 'url("https://cdn.discordapp.com/attachments/1318109419585671249/1318374907704512592/das-gigapixel-standard-scale-4_00x.png?ex=676217d0&is=6760c650&hm=210f426f9064ce0ec44df65d74be1e71a92b36dc134069605d1017f4fb2a0336&")',
                      },
                    }}
                  >
                    {!isUser && (
                      <Avatar
                        alt="Assistant"
                        src={`/images/${avatarImg}`}
                        sx={{ marginRight: 2 }}
                      />
                    )}
                    <Box
                      color="white"
                      borderRadius={16}
                      p={2}
                      maxWidth="70%"
                      dangerouslySetInnerHTML={{
                        __html: marked(message.content),
                      }}
                    />
                    {isUser && (
                      <Avatar
                        alt="User"
                        src="/images/user-avatar.png"
                        sx={{ marginLeft: 2 }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>

            <Box
              sx={{
                borderTop: 0,
                borderColor: "divider",
                p: 2,
                display: "flex",
                alignItems: "center",
                backgroundImage: 'url("https://cdn.discordapp.com/attachments/1312932606802792450/1313713132161601596/Screenshot_2024-12-03_at_7.46.15_PM.png?ex=675b0572&is=6759b3f2&hm=522aebbab24bce446ee34f551ce9c07e42d98de7701f44309c3363389bb1e810&")',
              }}
            >
              <TextField
                label="Type your message"
                fullWidth
                value={input}
                onChange={handleInputChange}
                variant="outlined"
                sx={{
                  marginRight: 2,
                  backgroundImage: "grey.100",
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              <IconButton color="red" onClick={handleSubmit}>
                <SendIcon />
              </IconButton>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

