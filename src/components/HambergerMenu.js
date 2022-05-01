export default function HamburgerMenu() {
    const toggleHamburgerMenu = () => {}
    return (
        <>
        <div class="menuContainer" onClick={() => {toggleHamburgerMenu()}}>
            <div class="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label class="menu__btn" for="menu__toggle">
                <span></span>
            </label>

            <div class="menu__box">
                <h3 className="menu__item">Infinitely Laoding</h3>
                <h4 className="menu__item">Saatvik Shukla <br/> <small>me@saatvikshukla.com</small></h4>
                <a  href="https://in.linkedin.com/in/saatvikshukla">
                    <h4 className="menu__item">
                        <img className="" src="/linkedin.png" />
                    </h4>
                </a>

                <img className="charactor animate__animated animate__fadeIn" src="/character.svg" />
            </div>
            </div>
        </div>
        </>
    );
    
}