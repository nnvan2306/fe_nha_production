import className from "classnames/bind";
import styles from "./Auth.module.scss";
import Image from "next/image";
import thumbnail from "../../../../public/thumbnail_auth.jpg";

const cx: Function = className.bind(styles);

export default function PageAuth() {
    return (
        <div className={cx("form-auth", "w-[100vw] h-[100vh]")}>
            <Image
                className="w-[100vw] h-[100vh] object-cover"
                src={thumbnail}
                alt="Thumbnail"
            />
        </div>
    );
}
