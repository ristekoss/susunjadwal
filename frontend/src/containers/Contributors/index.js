import React, { useCallback, useEffect, useState } from "react";
import { Text, Box, Button, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

import { ContributorCard } from "components/Cards";
import { getContributors } from "services/api";

const Contributors = () => {
  const [contributors, setContributors] = useState();

  const fetchContributors = useCallback(async () => {
    try {
      const { data } = await getContributors();
      setContributors(data);
    } catch (error) {
      alert("error");
    }
  }, []);

  useEffect(() => {
    fetchContributors();
  }, [fetchContributors]);

  const contributionList = contributors?.map((user) => (
    <ContributorCard
      key={user.id}
      name={user.login}
      avatar={user.avatar_url}
      github={user.html_url}
      contributions={user.contributions}
    />
  ));

  return (
    <Box mt={{ base: "calc(-5rem)", lg: "-4rem" }}>
      <Helmet title="Kontributor SusunJadwal" />

      <Link to="/">
        <Text
          fontSize={{ base: "sm", md: "lg" }}
          color="primary.Purple"
          ml="-9px"
        >
          <ChevronLeftIcon w={8} h={8} />
          Kembali ke Halaman Utama
        </Text>
      </Link>

      <Box textAlign="center" mt={{ base: "1rem", lg: "2rem" }}>
        <Text
          fontWeight="bold"
          fontSize={{ base: "x-large", md: "xx-large" }}
          color="primary.Purple"
        >
          Kontributor{" "}
          <Box as="span" color="secondary.MineShaft">
            Susun
          </Box>
          Jadwal
        </Text>
        <Text
          mt="1.5rem"
          fontSize={{ base: "xs", md: "md" }}
          px={{ md: "8rem" }}
        >
          Kami menyambut segala bentuk kontribusi, besar maupun kecil, untuk
          membantu menciptakan teknologi yang memberi dampak positif bagi
          kehidupan mahasiswa Universitas Indonesia.
        </Text>
        <a
          href="https://discord.gg/V9W5ESksgG"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button m="2rem auto 3rem">Gabung Discord SusunJadwal</Button>
        </a>
      </Box>

      <Flex
        w="fit-content"
        minH="90vh"
        mx="auto"
        gridGap="20px"
        wrap="wrap"
        justify="center"
      >
        {contributionList}
      </Flex>
    </Box>
  );
};

export default Contributors;
