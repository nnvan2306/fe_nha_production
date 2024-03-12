import className from "classnames/bind";
import styles from "./Login.module.scss";
import { routes } from "@/helpers/menuRouterHeader";

const cx: Function = className.bind(styles);

export default function PageLogin({
    params: { slug },
}: {
    params: { slug: string };
}) {
    return (
        <div
            className={cx(
                "form-login",
                "w-[400px] h-[600px] bg-[#fff] ml-[50%] translate-x-[-50%] rounded-[10px] shadow-lg pt-[20px] px-[20px]"
            )}
        >
            <p className="text-center text-[25px] font-[600]">
                {slug === routes.login.label ? "Login" : "Register"}
            </p>

            <div className="mt-[40px]">
                <label htmlFor="email">Email</label>
                <br />
                <input
                    type="email"
                    id="email"
                    placeholder="enter your email"
                    className=""
                />
            </div>
        </div>
    );
}
