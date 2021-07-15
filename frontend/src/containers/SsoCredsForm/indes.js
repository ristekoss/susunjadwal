import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';
import Bauhaus from 'components/Bauhaus';
import React from 'react';
import { Link } from 'react-router-dom';

const SsoCredsForm = () => {
  return (
    <>
      <Bauhaus />
      <Box width={{lg:'80%', xl: '70%'}}>
        <Link to="/">
          <Text color="var(--chakra-colors-primary-Purple)" fontSize="lg" ml='-9px'>
            <ChevronLeftIcon w={8} h={8} />
            Kembali ke Halaman Utama
          </Text>
          <Text fontSize="3xl" fontWeight="bold" mt="4" textAlign={{sm: 'center', lg: 'left'}}>Lengkapi Informasi untuk SusunJadwal</Text>
        </Link>
      </Box>
    </>
  );
}

export default SsoCredsForm;
