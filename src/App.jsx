import React from "react";
import { lazy, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router";
import { createRoutesFromElements } from "react-router";

const AdminPanel = lazy(() => import("./Pages/AdminPanel"));
const EditStudent = lazy(() => import("./Pages/EditStudent"));
const CreateStudent = lazy(() => import("./Pages/CreateStudent"));
import dotenv from 'dotenv';

dotenv.config();

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading</div>}>
              <AdminPanel />
            </Suspense>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <Suspense fallback={<div>Loading</div>}>
              <EditStudent />
            </Suspense>
          }
        />
        <Route
          path="/create_student"
          element={
            <Suspense fallback={<div>Loading</div>}>
              <CreateStudent />
            </Suspense>
          }
        />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
