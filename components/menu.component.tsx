import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import Link from "next/link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Divider from "@mui/material/Divider";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import React from "react";

interface Props {
    children: React.ReactNode;
}
export function Menu() {
    return ( <List component='nav'>
        <ListSubheader component='div' inset>
            Trabajo con Entity
        </ListSubheader>
        <Link href='/nueva-entity'>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary='Nueva entity' />
            </ListItemButton>
        </Link>
        <Link href='/agregar-atributos-entity'>
            <ListItemButton>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary='Agregar atributos' />
            </ListItemButton>
        </Link>
        <Link href='/crear-nomenclador'>
            <ListItemButton>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary='Crear un nomenclador' />
            </ListItemButton>
        </Link>
        <Divider />
        <ListSubheader component='div' inset>
            Trabajo con DTOs
        </ListSubheader>
        <Link href='/nuevo-dto'>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary='Nuevo DTO' />
            </ListItemButton>
        </Link>
        <Link href='/dto-crud'>
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary='DTOs para un CRUD' />
            </ListItemButton>
        </Link>
        <Divider />
        <ListSubheader component='div' inset>
            Creación de ficheros
        </ListSubheader>
        <Link href='/crear-controlador'>
            <ListItemButton>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary='Crear un controlador' />
            </ListItemButton>
        </Link>
        <Link href='/crear-service'>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary='Crear un service' />
            </ListItemButton>
        </Link>
        <Link href='/crear-mapper'>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary='Crear un mapper' />
            </ListItemButton>
        </Link>
        <Link href='/crear-repository'>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary='Crear un repository' />
            </ListItemButton>
        </Link>
        <Divider />
        <Link href='/crear-crud-completo'>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary='Crear un CRUD completo' />
            </ListItemButton>
        </Link>
    </List>);
}