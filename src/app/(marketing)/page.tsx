import className from "classnames/bind";
import styles from "./home.module.scss";
import { Col, Row } from "antd";
import Image from "next/image";
import thumbnailRight from "../../../public/cup_thumbnail-right.png";
import thumbnailLeft from "../../../public/logo_thumbnail-left.png";
import Link from "next/link";

const cx: Function = className.bind(styles);

export default function Page() {
    return (
        <div className={cx("form-home")}>
            <div className={cx("home-content  w-[100%] h-[100%]")}>
                <Row>
                    <Col span={8}>
                        <div
                            className={cx(
                                "thubnail-left",
                                "rounded-full object-cover overflow-hidden w-[300px] h-[300px] ml-[50%] mt-[50%] translate-x-[-50%] translate-y-[-50%] "
                            )}
                        >
                            <Image
                                src={thumbnailLeft}
                                alt="thumbnail-left"
                                width={300}
                                height={300}
                                objectFit="cover"
                            />
                        </div>
                    </Col>

                    <Col span={8}>
                        <div
                            className={cx(
                                "content-home",
                                "w-[100%] h-[100%] pt-[100px]"
                            )}
                        >
                            <p
                                className={cx(
                                    "text-center text-[35px] font-[600] text-[#fff] "
                                )}
                            >
                                welcome to
                            </p>
                            <p
                                className={cx(
                                    "text-center text-[50px] font-[600] text-[#fff] uppercase"
                                )}
                            >
                                premier league
                            </p>

                            <div
                                className={cx(
                                    "form-control-home",
                                    "mt-[50px] w-[100%] h-[100px] p-[20px] flex justify-center align-center"
                                )}
                            >
                                <Link href={"/home"}>
                                    <button
                                        className={cx(
                                            " mx-[20px] px-[10px] w-[200px] h-[60px] border-[1px] bg-[#2575fc] rounded-[10px] text-[#fff] text-[20px] font-[500]"
                                        )}
                                    >
                                        Get Started
                                    </button>
                                </Link>

                                <Link href={"/history"}>
                                    <button
                                        className={cx(
                                            "button-get",
                                            "mx-[20px] px-[10px] w-[200px] h-[60px] border-[1px] bg-[#fecfef] rounded-[10px] text-[#000] text-[20px] font-[500]"
                                        )}
                                    >
                                        More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Col>

                    <Col span={8}>
                        <div
                            className={cx(
                                "thumbnail-right",
                                "rounded-full object-cover overflow-hidden w-[300px] h-[300px] ml-[50%] mt-[50%] translate-y-[-50%] translate-x-[-50%]"
                            )}
                        >
                            <Image
                                className={cx("w-[100%] h-[100%] object-cover")}
                                src={thumbnailRight}
                                alt="thmbnail-right"
                                width={300}
                                height={400}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
