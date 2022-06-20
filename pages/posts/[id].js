import React from "react";
import apiClient from "../api/apiClient";
import { getPostData } from "./index";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import TextsmsIcon from "@mui/icons-material/Textsms";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";

export default function DetailPost({ data }) {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "50px",
          backgroundColor: "rgb(0, 171, 85)",
          display: "flex",
          alignItems: "center",
          color: "#fff",
          fontSize: "21px",
          fontWeight: "600",
          padding: "20px",
        }}
      >
        Tạ Đức Chiến
      </Box>
      <Container>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            height: "100px",
            marginTop: "30px",
          }}
        >
          <Link href="/posts">
            <a style={{ textDecoration: "underline" }}>List Post</a>
          </Link>
          <span> &gt; </span>
          <span>{data.text}</span>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", minHeight: "50px", gap: "70px" }}>
            <div>
              <Image
                src={data.image}
                width={500}
                height={500}
                style={{ objectFit: "contain", borderRadius: "20px" }}
              />
            </div>
            <div>
              <Grid container height="40px" display="flex" alignItems="center" borderBottom="1px solid #123">
                <Grid item xs={4}>
                  <TextsmsIcon />
                </Grid>
                <Grid item xs={8}>
                  {data.text}
                </Grid>
              </Grid>

              <Grid container height="40px" display="flex" alignItems="center" borderBottom="1px solid #123">
                <Grid item xs={4}>
                  <ThumbUpIcon />
                </Grid>
                <Grid item xs={8}>
                  {data.likes}
                </Grid>
              </Grid>

              <Grid container height="40px" display="flex" alignItems="center" borderBottom="1px solid #123">
                <Grid item xs={4}>
                  <CalendarTodayIcon />
                </Grid>
                <Grid item xs={8}>
                  {moment(data.publishDate).format("DD/MM/YYYY HH:mm")}
                </Grid>
              </Grid>

              <Grid container height="40px" display="flex" alignItems="center" borderBottom="1px solid #123">
                <Grid item xs={4}>
                  <LocalOfferIcon />
                </Grid>
                <Grid item xs={8}>
                  {data.tags.toString()}
                </Grid>
              </Grid>

              <Grid container display="flex" alignItems="center" >
                <Grid item xs={4}>
                  <PersonIcon />
                </Grid>
                <Grid item xs={8}>
                  <div style={{ display: "flex", height: "30px" }}>
                    <Box width='100px'>First Name:</Box>
                    <div>{data.owner.firstName}</div>
                  </div>
                  <div style={{ display: "flex", height: "30px" }}>
                    <Box width='100px'>lastName:</Box>
                    <div>{data.owner.lastName}</div>
                  </div>
                  <div style={{ display: "flex", height: "30px" }}>
                    <Box width='100px'>Avatar:</Box>
                    <div>
                      <Image
                        src={data.owner.picture}
                        width={200}
                        height={200}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const data = await getPostData(params);

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  // Return a list of possible value for id

  const data = await apiClient.get("/post");
  const posts = data.data.data;

  const paths = posts.map((x) => {
    return {
      params: {
        id: x.id,
        slug: x.text,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
