import { Container, Flex, HStack,Text, useColorMode,IconButton, useColorModeValue } from "@chakra-ui/react";
import {Link} from "react-router-dom";
import{PlusSquareIcon,MoonIcon, SunIcon} from "@chakra-ui/icons";


const Navbar = () => {

  // const {products}=useProductStore()
  const {colorMode,toggleColorMode}=useColorMode();
  return (
    <Container maxW={"1140px"} px={4} bg={useColorModeValue("gray.100","gray.900")}>
      <Flex 
      h={16}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDir={{
        base:"column",
        sm:'row'
      }}>

        <Text
        fontSize={{base:'22',sm:"28"}}
        fontWeight={"bold"}
        textAlign={"center"}
        bgGradient={"linear(to-r,cyan.400,blue.500)"}
        bgclip={"text"}>

          <Link to={"/"}>Product Store</Link>
        </Text>
        <HStack spacing={2} alignItems={'center'}>
          <Link to={"/create"} >
          <button>
            <PlusSquareIcon fontSize={20}/>
          </button>
          </Link>
          <button  onClick={toggleColorMode}>
            {colorMode==="light"? <MoonIcon/>:<SunIcon size='20'/>}

          </button>
        </HStack>

      </Flex>
    </Container>
  );
}

export default Navbar;