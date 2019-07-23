import HomePage from "./containers/HomePage";
import BuildSchedule from "./containers/BuildSchedule";

function createRoutes() {
  return [
    {
      path: "/",
      name: "home",
      exact: true,
      component: HomePage
    },
    {
      path: "/susun",
      name: "buildSchedule",
      component: BuildSchedule
    },
    {
      path: "/jadwal/:scheduleId",
      name: "showSchedule",
      component: BuildSchedule
    }

    //     const renderRoute = loadModule(cb);

    //     importModules.then(([reducer, sagas, component]) => {
    //       injectReducer("buildSchedule", reducer.default);
    //       injectSagas(sagas.default);
    //       renderRoute(component);
    //     });

    //     importModules.catch(errorLoading);
    //   }
    // },
    // {
    //   path: "jadwal",
    //   name: "jadwal",
    //   getComponent(nextState, cb) {
    //     const importModules = Promise.all([
    //       System.import("containers/Jadwal/reducer"),
    //       System.import("containers/Jadwal/sagas"),
    //       System.import("containers/Jadwal")
    //     ]);

    //     const renderRoute = loadModule(cb);

    //     importModules.then(([reducer, sagas, component]) => {
    //       injectReducer("jadwal", reducer.default);
    //       injectSagas(sagas.default);
    //       renderRoute(component);
    //     });

    //     importModules.catch(errorLoading);
    //   }
    // },
    // {
    //   path: "jadwal/:slug",
    //   name: "jadwalSpesifik",
    //   getComponent(nextState, cb) {
    //     const importModules = Promise.all([
    //       System.import("containers/JadwalSpesifik/reducer"),
    //       System.import("containers/JadwalSpesifik/sagas"),
    //       System.import("containers/JadwalSpesifik")
    //     ]);

    //     const renderRoute = loadModule(cb);

    //     importModules.then(([reducer, sagas, component]) => {
    //       injectReducer("jadwalSpesifik", reducer.default);
    //       injectSagas(sagas.default);
    //       renderRoute(component);
    //     });

    //     importModules.catch(errorLoading);
    //   }
    // },
    // {
    //   path: "/gabung",
    //   name: "gabungJadwal",
    //   getComponent(nextState, cb) {
    //     const importModules = Promise.all([
    //       System.import("containers/GabungJadwal/reducer"),
    //       System.import("containers/GabungJadwal/sagas"),
    //       System.import("containers/GabungJadwal")
    //     ]);

    //     const renderRoute = loadModule(cb);

    //     importModules.then(([reducer, sagas, component]) => {
    //       injectReducer("gabungJadwal", reducer.default);
    //       injectSagas(sagas.default);
    //       renderRoute(component);
    //     });

    //     importModules.catch(errorLoading);
    //   }
    // },
    // {
    //   path: "/logout",
    //   name: "logoutModule",
    //   getComponent(location, cb) {
    //     System.import("containers/LogoutModule")
    //       .then(loadModule(cb))
    //       .catch(errorLoading);
    //   }
    // },
    // {
    //   path: "*",
    //   name: "notfound",
    //   getComponent(nextState, cb) {
    //     System.import("containers/NotFoundPage")
    //       .then(loadModule(cb))
    //       .catch(errorLoading);
    //   }
    // }
  ];
}

export default createRoutes();
