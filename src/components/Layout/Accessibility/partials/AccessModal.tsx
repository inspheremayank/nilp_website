import { FC, useState } from "react";
import Switch from "./Switch";

interface AccessModalTypo {
    open: boolean;
    audioState: boolean;
    mouseTrailState: boolean;
    closeModal: () => void;
    audioHandler: () => void;
    mouseHandler: () => void;
}
const AccessModal: FC<AccessModalTypo> = ({ open, closeModal, audioState, mouseTrailState, audioHandler, mouseHandler }) => {
    const [titleText, setTitleText] = useState("Select Category of User");
    const [impairedInfoState, setImpairedInfoState] = useState(false);
    if (open) {
        document.body.classList.add("overflow-hidden");
    } else {
        return false;
    }

    const handleClose = () => {
        document.body.classList.remove("overflow-hidden");
        setTitleText("Select Category of User");
        setImpairedInfoState(false);
        closeModal();
    };

    const impairedInfoHandler = (data: any) => {
        setTitleText(data.title);
        setImpairedInfoState(true);
    };

    const impairedInfoBackHandler = () => {
        setTitleText("Select Category of User");
        setImpairedInfoState(false);
    };

    return (
        <>
            <div className="cus_modal">
                <button onClick={handleClose} className="cus_modal_close">
                    <div className="hamburger_lines active">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                </button>
                <div className="cus_modal_wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 mx-auto">
                                <div className="accessibility_modal">
                                    <div className="accessibility_modal_head">
                                        {impairedInfoState ? (
                                            <button onClick={impairedInfoBackHandler}>
                                                <svg fill="none" height="34" viewBox="0 0 45 34" width="45" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 17H41.9632" stroke="#F47920" strokeLinecap="round" strokeWidth="2"></path> <path d="M29.207 1L42.925 15.6273C43.6805 16.4329 43.64 17.6983 42.8347 18.454L28.0857 32.2929" stroke="#F47920" strokeLinecap="round" strokeWidth="2"></path>
                                                </svg>
                                            </button>
                                        ) : (
                                            ""
                                        )}
                                        {titleText}
                                    </div>
                                    {!impairedInfoState ? (
                                        <>
                                            <div className="accessibility_modal_wrap">
                                                <div className="accessibility_modal_box" onClick={() => impairedInfoHandler({ title: "For Visually impaired users" })}>
                                                    <div className="accessibility_modal_box_layer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="99" height="99" viewBox="0 0 99 99" fill="none">
                                                            <path
                                                                d="M9.98301 52.4419C9.42126 51.5522 9.14035 51.1075 8.98311 50.4215C8.86501 49.9063 8.86501 49.0937 8.98311 48.5785C9.14035 47.8925 9.42126 47.4478 9.98301 46.5581C14.6253 39.2075 28.4435 20.625 49.5017 20.625C70.5598 20.625 84.3781 39.2075 89.0204 46.5581C89.5822 47.4478 89.8631 47.8925 90.0203 48.5785C90.1383 49.0937 90.1383 49.9063 90.0203 50.4215C89.8631 51.1075 89.5822 51.5522 89.0204 52.4419C84.3781 59.7927 70.5598 78.375 49.5017 78.375C28.4435 78.375 14.6253 59.7927 9.98301 52.4419Z"
                                                                stroke="#202020"
                                                                strokeWidth="8"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path d="M49.5015 61.875C56.3362 61.875 61.8765 56.3347 61.8765 49.5C61.8765 42.6653 56.3362 37.125 49.5015 37.125C42.6668 37.125 37.1265 42.6653 37.1265 49.5C37.1265 56.3347 42.6668 61.875 49.5015 61.875Z" stroke="#202020" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="accessibility_modal_box_text">Visually Impaired</div>
                                                </div>
                                                <div className="accessibility_modal_box" onClick={() => impairedInfoHandler({ title: "For Hearing Impaired users" })}>
                                                    <div className="accessibility_modal_box_layer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" viewBox="0 0 85 85" fill="none">
                                                            <g clipPath="url(#clip0_7_939)">
                                                                <path
                                                                    d="M82.1543 1.28102C84.0109 3.43336 83.95 6.19409 82.1543 8.03859L70.5163 19.7706C68.3826 21.6358 65.6852 21.5547 63.8526 19.7706C62.0319 17.677 62.0185 14.777 63.8526 13.013L75.4906 1.28109C77.5202 -0.442214 80.4111 -0.411756 82.1543 1.28102ZM24.0579 53.0892C26.0876 51.3661 28.9783 51.3963 30.7217 53.0892C32.5079 55.1237 32.5909 58.171 30.7217 59.8467L9.51036 81.2458C7.37672 83.1109 4.67924 83.0299 2.84657 81.2458C1.02594 79.1521 1.01255 76.2523 2.84657 74.4882L24.0579 53.0892ZM44.5184 37.5092C44.3485 34.0608 41.5738 31.5438 38.5116 31.5024C35.1108 31.6902 32.5477 34.4543 32.5048 37.5092C32.3595 39.6967 30.9411 41.1431 28.9383 41.1696C26.724 41.007 25.3964 39.4851 25.3718 37.5092C25.4955 33.8312 26.8129 30.5671 29.2199 28.1237C31.9018 25.6121 35.124 24.3002 38.5116 24.2756C42.1843 24.3949 45.3718 25.7274 47.8032 28.1237C50.3181 30.8221 51.6267 34.1047 51.6513 37.5092C51.506 39.6967 50.0876 41.1431 48.0848 41.1696C45.8705 41.007 44.543 39.4851 44.5184 37.5092ZM38.5116 10.385C45.7166 10.5395 52.3882 13.4289 57.095 18.128C62.0529 23.3826 64.7431 30.225 64.7911 36.8522C64.6423 42.878 63.5755 45.7346 60.7553 50.3674C59.216 54.037 55.666 56.7586 53.7631 60.0814C52.6843 63.5155 53.4785 67.2567 53.3407 71.0625C53.2893 75.3069 51.6274 80.0522 48.6949 82.372C45.4096 84.2869 41.9804 85 38.9808 85C36.4857 84.8058 34.9019 83.0005 34.7573 80.7765C34.6762 79.619 35.1315 78.5373 35.8835 77.7732C37.774 75.8455 39.6283 76.5753 41.9372 75.9899C42.771 75.725 43.975 75.409 44.2836 74.5352C44.815 72.8965 44.798 70.8908 44.7998 69.5138C44.9556 66.017 44.2998 62.7986 45.0344 59.5183C45.538 57.4049 46.3664 55.4054 47.6154 53.7931C48.4594 52.6827 49.4251 51.7064 50.1495 50.7428C51.1919 49.4532 52.0365 48.058 52.8713 46.754C53.772 45.3761 54.4773 44.0097 55.3115 42.6713C55.9813 40.7452 56.2448 38.7261 56.2501 36.8522C56.0802 31.9028 54.2801 27.5167 51.0411 24.2288C47.4311 20.8525 43.075 19.0533 38.5114 19.0197C33.5671 19.1853 29.2576 21.0003 25.9817 24.2288C22.6021 27.8551 20.8064 32.2717 20.7727 36.8522C20.5914 39.3803 18.861 41.1381 16.5493 41.1696C14.0092 40.9791 12.2634 39.1618 12.2319 36.8522C12.396 29.6214 15.2676 22.919 19.928 18.1282C25.0999 13.1108 31.9179 10.4328 38.5116 10.385Z"
                                                                    fill="#202020"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_7_939">
                                                                    <rect width="85" height="85" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                    <div className="accessibility_modal_box_text">Hearing Impaired</div>
                                                </div>
                                            </div>
                                            <div className="accessibility_modal_wrap flex-col items-center">
                                                <section className="accessibility_slide_box">
                                                    <h4 className="accessibility_slide_box_head">Text to Audio:</h4>
                                                    <Switch isChecked={audioState} onChange={audioHandler} />
                                                </section>
                                                <section className="accessibility_slide_box">
                                                    <h4 className="accessibility_slide_box_head">Mouse Trail:</h4>
                                                    <Switch isChecked={mouseTrailState} onChange={mouseHandler} />
                                                </section>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {titleText == "For Visually impaired users" ? (
                                                <div className="accessibility_modal_wrap">
                                                <div className="accessibility_modal_wrap_content">
                                                    <p>Step into a realm where barriers are shattered and experiences are enhanced. Our website is equipped with a suite of accessibility tools designed to revolutionize your browsing experience. Nestled at the extreme right at the top of our website lies the gateway to empowerment - our Accessibility tool. Here, you can effortlessly tailor your journey to suit your unique needs.</p>
                                                    <ul className="accessibility_modal_wrap_list">
                                                        <li><strong>Text Size Control:</strong> Amplify the clarity of every word with the ability to increase or decrease text size, ensuring that nothing escapes your gaze.</li>
                                                        <li><strong>Contrast Customization:</strong>  Navigate with ease by choosing from a spectrum of contrast schemes, catering to diverse visual needs and preferences.</li>
                                                        <li><strong>Text-to-Audio Transformation:</strong>  Elevate your experience by listening to the text instead of reading it, with seamless toggle options for convenience.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            ) : (
                                                <div className="accessibility_modal_wrap">
                                                    <div className="accessibility_modal_wrap_content">
                                                        <p>Embrace the power of inclusion with our commitment to accessibility. Whether you experience partial or complete hearing loss, we ensure that every moment of our content is within reach. With transcripts and captions (subtitles) available for all videos, simply click the &apos;cc&apos; option on the bottom right side of the video box and immerse yourself in a world where every word is visible and every message is heard.</p>
                                                    </div>
                                                </div>
                                                
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccessModal;
