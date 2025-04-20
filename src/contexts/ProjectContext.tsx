import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { API_URL } from "../Constants";
import { defaultUser, User } from "./UserContext";
import { defaultStatus, Status } from "./StatusContext";
import { Client, defaultClient } from "./ClientContext";

interface ProjectValues {
  projects: Project[];
  getProjects?(): Promise<void>;
}

const defaultValues: ProjectValues = {
  projects: [],
};

export interface Project {
  id: string;
  projectName: string;
  description: string;
  image: string | null;
  startDate: Date;
  endDate: Date;
  created: Date;
  budget: number;
  client: Client;
  owner: User;
  status: Status;
}

export const defaultProject: Project = {
  id: "",
  projectName: "",
  description: "",
  image: null,
  startDate: new Date(),
  endDate: new Date(),
  created: new Date(),
  budget: 0,
  client: defaultClient,
  owner: defaultUser,
  status: defaultStatus,
};

const ProjectContext = createContext<ProjectValues>(defaultValues);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);

  const getProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setProjects(data);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, [token]);

  return (
    <ProjectContext.Provider
      value={{ projects: projects, getProjects: getProjects }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
