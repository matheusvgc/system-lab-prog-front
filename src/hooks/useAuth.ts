import type { SignInCredentials } from "@/context/authContext";

import api from "@/services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
	sub: string;
}

export interface UserProps {
	accountNonExpired: boolean;
	accountNonLocked: boolean;
	addresses: any[];
	authorities: any[];
	cart: any | null;
	cpf: string;
	credentialsNonExpired: boolean;
	email: string;
	enabled: boolean;
	firstname: string;
	lastname: string;
	orders: any[];
	password: string;
	role: string;
	status: string;
	userId: string;
	username: string;
}

export default function useAuth() {
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [userType, setUserType] = useState("");
	const [user, setUser] = useState<UserProps>({} as UserProps);
	const navigate = useNavigate();
	const handleRedirectToHomePage = () => {
		navigate("/home");
	};

	useEffect(() => {
		const token = Cookies.get("token");
		if (token) {
			api.defaults.headers.Authorization = `Bearer ${token}`;
			const decodedToken = jwtDecode<DecodedToken>(token);

			api
				.get(`user/byUsername/${decodedToken?.sub}`)
				.then((response) => {
					const {
						accountNonExpired,
						accountNonLocked,
						addresses,
						authorities,
						cart,
						cpf,
						credentialsNonExpired,
						email,
						enabled,
						firstname,
						lastname,
						orders,
						password,
						role,
						status,
						userId,
						username,
					} = response.data;

					setAuthenticated(true);
					setUserType(role);
					setUser({
						accountNonExpired,
						accountNonLocked,
						addresses,
						authorities,
						cart,
						cpf,
						credentialsNonExpired,
						email,
						enabled,
						firstname,
						lastname,
						orders,
						password,
						role,
						status,
						userId,
						username,
					});
				})
				.catch(() => {
					handleLogOut();
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, []);

	async function handleLogin({ username, password }: SignInCredentials) {
		try {
			const { data } = await api.post("auth/login", {
				username,
				password,
			});
			Cookies.set("token", data?.token);
			api.defaults.headers.Authorization = `Bearer ${data?.token}`;
			const user = await api.get(`user/byUsername/${username}`);
			setUser(user?.data);
			setAuthenticated(true);
			setUserType(data?.role);
			handleRedirectToHomePage();
		} catch (error) {
			console.error(error);
		}
	}

	async function handleLogOut() {
		try {
			Cookies.remove("token");
			setAuthenticated(false);
			handleRedirectToHomePage();
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	}

	return {
		authenticated,
		userType,
		handleLogin,
		handleLogOut,
		loading,
		user,
	};
}
