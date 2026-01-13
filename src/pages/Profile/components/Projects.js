// Chakra imports
import {
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import imageArchitect1 from "assets/img/ImageArchitect1.png";
import imageArchitect2 from "assets/img/ImageArchitect2.png";
import imageArchitect3 from "assets/img/ImageArchitect3.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ProjectCard from "./ProjectCard";

// Initial projects data
const initialProjects = [
  {
    id: 1,
    image: imageArchitect1,
    name: "Project #1",
    category: "Modern",
    description: "As Uber works through a huge amount of internal management turmoil.",
    avatars: [avatar2, avatar4, avatar6],
  },
  {
    id: 2,
    image: imageArchitect2,
    name: "Project #2",
    category: "Scandinavian",
    description: "Music is something that every person has his or her own specific opinion about.",
    avatars: [avatar4, avatar2, avatar6, avatar4],
  },
  {
    id: 3,
    image: imageArchitect3,
    name: "Project #3",
    category: "Minimalist",
    description: "Different people have different taste, especially various types of music.",
    avatars: [avatar2, avatar4, avatar6],
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

  const handleCreateProject = () => {
    if (newProject.name && newProject.category) {
      const project = {
        id: projects.length + 1,
        image: imageArchitect1, // Default image
        name: newProject.name,
        category: newProject.category,
        description: newProject.description || "No description provided.",
        avatars: [avatar2, avatar4],
      };

      setProjects([...projects, project]);
      toast({
        title: "Project Created",
        description: `${newProject.name} has been created successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      setNewProject({ name: "", category: "", description: "" });
      onClose();
    }
  };

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
            gap='24px'>
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
              minHeight={{ sm: "200px", md: "100%" }}
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb='15px'>
              <FormLabel>Project Name</FormLabel>
              <Input
                placeholder='Enter project name'
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
            </FormControl>
            <FormControl mb='15px'>
              <FormLabel>Category</FormLabel>
              <Input
                placeholder='e.g., Modern, Minimalist, Classic'
                value={newProject.category}
                onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder='Enter project description'
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows={3}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme='teal'
              onClick={handleCreateProject}
              isDisabled={!newProject.name || !newProject.category}
            >
              Create Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Projects;
