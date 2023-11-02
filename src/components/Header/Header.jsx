import logo from "../../image/header-logo.svg";

export default function Header() {
  return (
    <header className="header page__header">
      <a href="/#">
        <img className="header__logo" src={logo} alt="Логотип" />
      </a>
    </header>
  );
}
