import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { fontWeight, padding } from "@mui/system";
import moment from "moment";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";


export default function index({ posts, total }) {

  const listSort = [
    {
      label: "No",
      value: -1,
    },
    {
      label: "Asc like",
      value: 0,
    },
    {
      label: "Des like",
      value: 1,
    },
  ];

  const [typeSort, setTypeSort] = useState(-1);
  const [listPost, setListPost] = useState(posts)
  const [params, setParams] = useState({ limit: 10, page: 0 });

  const handleChangeTypeSort = (e) => {
    setTypeSort(e.target.value);
    if(e.target.value === 0) {
        setListPost(listPost.sort((a,b) => a.likes - b.likes))  
    }

    if(e.target.value === 1) {
        setListPost(listPost.sort((a,b) => b.likes - a.likes))
    }
  };
 
  const slugify = (text) =>
      text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

  const goDetailPost = (id) => {
    Router.push(`/posts/${id}`);
  };

  const changePagingNumber = (event, value) => {
    setParams({ limit: 10, page: value })
  };

  useEffect(() => {
    (async () => {
      const data = await apiClient.get(
        `/post/?page=${params.page}&limit=${params.limit}`
      );

      setListPost(data.data.data);
    })();

    setTypeSort(0)
  }, [params]);


  return (
    <Box>
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
        <Grid marginTop="30px">
          <Box display="flex" alignItems="center" marginBottom="30px">
            Sort by:
            <TextField
              select
              value={typeSort}
              onChange={handleChangeTypeSort}
              sx={{ width: "150px" }}
            >
              {listSort.map((x) => (
                <MenuItem key={x.value} value={x.value}>
                  {x.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "700" }}>Index</TableCell>
                    <TableCell sx={{ fontWeight: "700" }} align="center">
                      Text
                    </TableCell>
                    <TableCell sx={{ fontWeight: "700" }} align="center">
                      Likes
                    </TableCell>
                    <TableCell sx={{ fontWeight: "700" }} align="center">
                      PublishDate
                    </TableCell>
                    <TableCell sx={{ fontWeight: "700" }} align="center">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listPost.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="left">{row.text}</TableCell>
                      <TableCell align="center">{row.likes}</TableCell>
                      <TableCell align="center">
                        {moment(row.publishDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          style={{
                            cursor: "pointer",
                            textTransform: "lowercase",
                            backgroundColor: "rgb(0, 171, 85)",
                          }}
                          variant="contained"
                          onClick={() => goDetailPost(row.id)}
                        >
                          Xem chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" margin="20px">
          <Pagination
            count={(total / 10).toFixed()}
            color="primary"
            onChange={changePagingNumber}
          />
        </Box>
      </Container>
    </Box>
  );
}

export async function getStaticProps() {
  const params = {
    limit: 10,
    page: 0,
  };

  const data = await apiClient.get(
    `/post/?page=${params.page}&limit=${params.limit}`
  );

  const total = data.data.total;

  const posts = data.data.data;

  return {
    props: {
      posts,
      total,
    },
  };
}

export async function getPostData(params) {
  const dataCall = await apiClient.get(`/post/${params.id}`);

  // Combine the data with the id
  return {
    id: params.id,
    ...dataCall.data,
  };
}
