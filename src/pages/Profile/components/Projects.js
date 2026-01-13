// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FaPlus, FaProjectDiagram, FaLayerGroup, FaAlignLeft } from "react-icons/fa";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import imageArchitect1 from "assets/img/ImageArchitect1.png";
import imageArchitect2 from "assets/img/ImageArchitect2.png";
import imageArchitect3 from "assets/img/ImageArchitect3.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState, useCallback } from "react";
import ProjectCard from "./ProjectCard";

// Initial projects data
const initialProjects = [
  {
    id: 1,
    image: imageArchitect1,
    name: "Project #1",
    category: "Modern",
    description: "As Uber works through a huge amount of internal management turmoil.",
    avatars: [avatar1, avatar2, avatar3, avatar4],
  },
  {
    id: 2,
    image: imageArchitect2,
    name: "Project #2",
    category: "Scandinavian",
    description: "Music is something that every person has his or her own specific opinion about.",
    avatars: [avatar1, avatar2, avatar3, avatar4],
  },
  {
    id: 3,
    image: imageArchitect3,
    name: "Project #3",
    category: "Minimalist",
    description: "Different people have different taste, especially various types of music.",
    avatars: [avatar1, avatar2, avatar3, avatar4],
  },
];

const Projects = ({ title, description }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projects, setProjects] = useState(initialProjects);
  const [newProject, setNewProject] = useState({
    name: "",
    category: "",
    description: "",
  });
  const toast = useToast();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const handleCreateProject = useCallback(() => {
    if (newProject.name && newProject.category) {
      const project = {
        id: projects.length + 1,
        image: imageArchitect1,
        name: newProject.name,
        category: newProject.category,
        description: newProject.description || "No description provided.",
        avatars: [avatar2, avatar4],
      };

      setProjects([...projects, project]);
      toast({
        position: 'top-right',
        duration: 3000,
        isClosable: true,
        render: () => (
          <Box
            bg='teal.300'
            color='white'
            px='24px'
            py='14px'
            borderRadius='12px'
            boxShadow='0 4px 12px rgba(0, 0, 0, 0.15)'
          >
            <Flex align='center'>
              <Icon as={FaPlus} w='16px' h='16px' me='12px' />
              <Box>
                <Text fontWeight='bold' fontSize='sm'>
                  Project Created
                </Text>
                <Text fontSize='xs' opacity='0.9'>
                  {newProject.name} has been added
                </Text>
              </Box>
            </Flex>
          </Box>
        ),
      });

      setNewProject({ name: "", category: "", description: "" });
      onClose();
    }
  }, [newProject, projects, toast, onClose]);

  return (
    <>
      <Card p='16px' my='24px'>
        <CardHeader p='12px 5px' mb='12px'>
          <Flex direction='column'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              {title}
            </Text>
            <Text fontSize='sm' color='gray.500' fontWeight='400'>
              {description}
            </Text>
          </Flex>
        </CardHeader>
        <CardBody px='5px'>
          <Grid
            templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
            templateRows={{ sm: "auto", md: "auto", xl: "1fr" }}
            gap='24px'
            alignItems='stretch'>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                image={project.image}
                name={project.name}
                category={project.category}
                description={project.description}
                avatars={project.avatars}
              />
            ))}
            <Button
              p='0px'
              bg='transparent'
              color='gray.500'
              border='1px solid lightgray'
              borderRadius='15px'
              minHeight='200px'
              h='100%'
              onClick={onOpen}
              _hover={{ borderColor: 'teal.300', color: 'teal.300' }}
              transition='all 0.2s'
            >
              <Flex direction='column' justifyContent='center' align='center'>
                <Icon as={FaPlus} fontSize='lg' mb='12px' />
                <Text fontSize='lg' fontWeight='bold'>
                  Create a New Project
                </Text>
              </Flex>
            </Button>
          </Grid>
        </CardBody>
      </Card>

      {/* Create Project Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size='md'>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(8px)' />
        <ModalContent borderRadius='24px' p='0' overflow='hidden'>
          <ModalCloseButton
            top='15px'
            right='15px'
            bg='gray.100'
            borderRadius='full'
            _hover={{ bg: 'gray.200' }}
          />
          <ModalBody p='0'>
            {/* Header Section */}
            <Box
              bg='linear-gradient(135deg, #4FD1C5 0%, #2C7A7B 100%)'
              py='30px'
              px='24px'
              textAlign='center'
            >
              <Flex
                w='60px'
                h='60px'
                bg='white'
                borderRadius='16px'
                align='center'
                justify='center'
                mx='auto'
                mb='16px'
                boxShadow='0 4px 12px rgba(0,0,0,0.15)'
              >
                <Icon as={FaPlus} color='teal.400' w='24px' h='24px' />
              </Flex>
              <Text fontSize='xl' fontWeight='bold' color='white'>
                Create New Project
              </Text>
              <Text fontSize='sm' color='whiteAlpha.800' mt='4px'>
                Fill in the details below
              </Text>
            </Box>

            {/* Form Section */}
            <Box p='24px'>
              <Box mb='20px'>
                <Flex align='center' mb='8px'>
                  <Icon as={FaProjectDiagram} color='teal.300' w='14px' h='14px' me='8px' />
                  <Text fontSize='sm' fontWeight='600' color={textColor}>
                    Project Name
                  </Text>
                </Flex>
                <Input
                  placeholder='Enter project name'
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  borderRadius='12px'
                  borderColor='gray.200'
                  _focus={{
                    borderColor: 'teal.300',
                    boxShadow: '0 0 0 1px #4FD1C5',
                  }}
                />
              </Box>

              <Box mb='20px'>
                <Flex align='center' mb='8px'>
                  <Icon as={FaLayerGroup} color='teal.300' w='14px' h='14px' me='8px' />
                  <Text fontSize='sm' fontWeight='600' color={textColor}>
                    Category
                  </Text>
                </Flex>
                <Input
                  placeholder='e.g., Modern, Minimalist, Classic'
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  borderRadius='12px'
                  borderColor='gray.200'
                  _focus={{
                    borderColor: 'teal.300',
                    boxShadow: '0 0 0 1px #4FD1C5',
                  }}
                />
              </Box>

              <Box mb='24px'>
                <Flex align='center' mb='8px'>
                  <Icon as={FaAlignLeft} color='teal.300' w='14px' h='14px' me='8px' />
                  <Text fontSize='sm' fontWeight='600' color={textColor}>
                    Description
                  </Text>
                </Flex>
                <Textarea
                  placeholder='Enter project description'
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  rows={3}
                  borderRadius='12px'
                  borderColor='gray.200'
                  resize='none'
                  _focus={{
                    borderColor: 'teal.300',
                    boxShadow: '0 0 0 1px #4FD1C5',
                  }}
                />
              </Box>

              <Flex justify='space-between'>
                <Button
                  variant='ghost'
                  onClick={onClose}
                  borderRadius='12px'
                  color='gray.500'
                  px='24px'
                >
                  Cancel
                </Button>
                <Button
                  bg='teal.300'
                  color='white'
                  onClick={handleCreateProject}
                  isDisabled={!newProject.name || !newProject.category}
                  borderRadius='12px'
                  px='32px'
                  _hover={{ bg: 'teal.400' }}
                  _active={{ bg: 'teal.500' }}
                  leftIcon={<Icon as={FaPlus} w='12px' h='12px' />}
                >
                  Create Project
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Projects;
