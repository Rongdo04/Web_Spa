// contexts/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import authAPI from "../services/authAPI";

// Initial state
const initialState = {
  user: null, // User với tất cả thông tin customer đã được gộp
  token: null, // Token được lưu trong HTTP-only cookie
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
const ActionTypes = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  REGISTER_START: "REGISTER_START",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",
  LOGOUT: "LOGOUT",
  LOAD_USER_START: "LOAD_USER_START",
  LOAD_USER_SUCCESS: "LOAD_USER_SUCCESS",
  LOAD_USER_FAILURE: "LOAD_USER_FAILURE",
  SET_LOADING_FALSE: "SET_LOADING_FALSE",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_START:
    case ActionTypes.REGISTER_START:
    case ActionTypes.LOAD_USER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case ActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case ActionTypes.LOGIN_FAILURE:
    case ActionTypes.REGISTER_FAILURE:
    case ActionTypes.LOAD_USER_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case ActionTypes.SET_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on app start
  useEffect(() => {
    loadUser();
  }, []);

  // Load user data
  const loadUser = async () => {
    dispatch({ type: ActionTypes.LOAD_USER_START });
    try {
      const response = await authAPI.getProfile();
      dispatch({
        type: ActionTypes.LOAD_USER_SUCCESS,
        payload: {
          user: response.data.user,
          customer: response.data.customer,
        },
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.LOAD_USER_FAILURE,
        payload: error.message || "Failed to load user",
      });
    }
  };

  // Login function
  const login = async (credentials) => {
    dispatch({ type: ActionTypes.LOGIN_START });
    try {
      const response = await authAPI.login(credentials);
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: {
          user: response.data.user,
          // Token được lưu tự động trong HTTP-only cookie
        },
      });
      // Load complete profile including customer data
      await loadUser();
      return response;
    } catch (error) {
      dispatch({
        type: ActionTypes.LOGIN_FAILURE,
        payload: error.message || "Login failed",
      });
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: ActionTypes.REGISTER_START });
    try {
      const response = await authAPI.register(userData);
      dispatch({
        type: ActionTypes.REGISTER_SUCCESS,
        payload: {
          user: response.data.user,
          // Token được lưu tự động trong HTTP-only cookie
        },
      });
      // Load complete profile including customer data
      await loadUser();
      return response;
    } catch (error) {
      dispatch({
        type: ActionTypes.REGISTER_FAILURE,
        payload: error.message || "Registration failed",
      });
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
    } finally {
      dispatch({ type: ActionTypes.LOGOUT });
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  const value = {
    user: state.user,
    // Giữ customer field để tương thích với frontend hiện tại
    customer:
      state.user?.role === "user"
        ? {
            id: state.user._id,
            name: state.user.name,
            phone: state.user.phone,
            email: state.user.email,
            avatar: state.user.avatar,
            level: state.user.level,
            totalSpent: state.user.totalSpent,
            totalAppointments: state.user.totalAppointments,
            points: state.user.points,
          }
        : null,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    logout,
    loadUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
