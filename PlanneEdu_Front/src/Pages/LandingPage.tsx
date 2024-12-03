import "../Css/LandingPage.css";
import landingLogo from '../assets/logo.svg';
import { ChartNoAxesColumnIncreasing } from 'lucide-react';
import { Zap } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import giovanna from "../../src/assets/giovanna.svg";
import gabriel from "../assets/gabriel.svg";
import larissa from "../assets/larissa.svg";
import lara from "../assets/lara.svg";
import sarah from "../assets/sarah.svg";
import gustavo from "../assets/gustavo.svg";
import duda from "../assets/duda.svg";
import kethelyn from "../assets/kethelyn.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function LandingPage() {
    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="seta-esquerda" onClick={onClick} style={{ cursor: "pointer" }}>
                <ArrowLeft style={{ marginTop: '1vw', marginLeft: '1vw' }} />
            </div>
        );
    };

    const NextArrow = (props) => {
        const { onClick } = props;
        return (

            <div className="seta-direita" onClick={onClick} style={{ cursor: "pointer" }}>
                <ArrowRight style={{ marginTop: '1vw', marginLeft: '1vw' }} />
            </div>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <section className="landing-page">
            <div className="first-section">
                <div className="bemVindo">
                    <img src={landingLogo} alt="" />
                    <h2>Seja bem-vindo(a) ao</h2>
                    <h1>PlanneEdu.</h1>
                    <p>Seu aliado na construção de estratégias de ensino inovadoras!</p>
                    <div className="buttons-conheca">
                        <a href="/addUser"><button>Conheça nosso projeto</button></a>
                    </div>
                </div>
            </div>

            <div className="second-section">
                <div className="conheca-projeto">
                    <div className="tag-apresentacao">
                        <div className="bolinha-branca"></div>
                        <p>sobre nós</p>
                        <div className="bolinha-branca2"></div>
                    </div>
                    <h1><span className="conheca">Conheça e entenda</span> nosso projeto!</h1>
                    <p>O sistema que veio para te ajudar.</p>
                </div>

                <div className="descricao-div">
                    <div className="descricao-landingPage">
                        <p>O PlanneEdu é um software que simplifica
                            a criação de planos de ensino, permitindo
                            a definição de objetivos, carga horária e
                            estratégias, além de acompanhar situações
                            de aprendizagem. Ele oferece uma visão
                            completa das unidades curriculares, facilitando
                            o trabalho de docentes e gestores.</p>
                    </div>

                    <div className="descricao-landingPage2">
                        <p>Destinado a docentes e OPPs do SENAI, o
                            PlanneEdu prioriza padronização e
                            acessibilidade, com uma interface intuitiva
                            e segura. O sistema gera relatórios em PDF,
                            permite personalização de temas e melhora
                            a gestão acadêmica, contribuindo para a
                            qualidade do ensino e o sucesso dos alunos.</p>
                    </div>

                </div>


            </div>

            <div className="third-section">
                <div className="tag-objetivo">
                    <div className="bolinha-objetivo"></div>
                    <p>objetivo</p>
                    <div className="bolinha-objetivo2"></div>
                </div>
                <div className="objetivo">
                    <h1>Nossos principais objetivos?</h1>

                    <div className="objetivos-cards">
                        <div className="objetivos-card1">
                            <ChartNoAxesColumnIncreasing size={60} color="#074973" strokeWidth={4} id="grafico" />
                            <h1>Padronização</h1>
                            <p>Garantimos a uniformidade na criação
                                de planos de ensino, facilitando a
                                padronização para melhor gestão e
                                acompanhamento das unidades
                                curriculares.</p>
                        </div>

                        <div className="objetivos-card1">
                            <Zap size={60} color="#074973" strokeWidth={2} fill="#074973" id="zap" />
                            <h1>Agilidade</h1>
                            <p>Otimize seu tempo com um sistema
                                rápido e intuitivo, projetado para
                                acelerar o desenvolvimento e
                                gerenciamento de planos de ensino.</p>
                        </div>

                        <div className="objetivos-card1">
                            <FontAwesomeIcon icon={faGear} color="#074973" id="gear" size="4x" />
                            <h1>Praticidade</h1>
                            <p>Simplifique o processo de criação
                                de planos de ensino com uma
                                interface amigável e ferramentas
                                eficientes para docentes e gestores.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fourth-section">
                <div className="tag-equipe">
                    <div className="bolinha-objetivo"></div>
                    <p>Equipe</p>
                    <div className="bolinha-objetivo2"></div>
                </div>
                <h1>Conheça nosso time, e veja em
                    que parte cada um atuou.</h1>

                <div className="carrossel-equipe">
                    <Slider {...settings}>
                        <div className="card-equipe1">
                            <img src={giovanna} alt="" />
                            <div className="descricao-pessoa">
                                <h1>Giovanna Sousa</h1>
                                <p>Líder de Projetos e Desenvolvedora
                                    Back-End</p>
                            </div>
                        </div>
                        <div className="card-equipe1">
                            <img src={gabriel} alt="" />
                            <div className="descricao-pessoa">
                                <h1>Gabriel Paixão</h1>
                                <p>Desenvolvedora Back-End</p>
                            </div>
                        </div>
                        <div className="card-equipe1">
                            <img src={larissa} alt="" />
                            <div className="descricao-pessoa">
                                <h1>Larissa Rodrigues</h1>
                                <p>Desenvolvedora Líder Front-End</p>
                            </div>
                        </div>
                        <div className="card-equipe1">
                            <img src={sarah} alt="" />
                            <div className="descricao-pessoa">
                                <h1>Sarah Cruz</h1>
                                <p>Designer e Desenvolvedora
                                    Front-End</p>
                            </div>
                        </div>
                        <div className="card-equipe1">
                            <img src={lara} alt="" />
                            <div className="descricao-pessoa">
                                <h1>Lara Zanelato</h1>
                                <p>Designer e Desenvolvedora
                                    Front-End</p>
                            </div>
                        </div>
                        <div className="card-equipe1">
                            <img src={gustavo} alt="" />
                            <div className="descricao-pessoa">
                                <h1>Gustavo Paixão</h1>
                                <p>Administrador de Banco de Dados e
                                    Desenvolvedor Front-End</p>
                            </div>
                        </div>
                        <div className="card-equipe1">
                            <img src={duda} alt="" />
                            <div className="descricao-pessoa">
                                <h1>Maria Eduarda</h1>
                                <p>Administradora de Banco de Dados e
                                    Documentadora</p>
                            </div>
                        </div>
                        <div className="card-equipe1">
                            <img src={kethelyn} alt="" />
                            <div className="descricao-pessoa">
                                <h1>Kethelyn Caitano</h1>
                                <p>Documentadora</p>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>

            <div className="fifth-section">
                <h1>Sobre o nosso sistema</h1>
                <div className="sobre-sistema">
                    <div className="organize">
                        <h4>Organize e acompanhe seus planos de curso com facilidade</h4>
                        <p>Nosso sistema permite a criação e o acompanhamento de planos de curso detalhados. Com ele, você pode definir a estrutura completa do curso, incluindo objetivos, conteúdos, carga horária e estratégias de ensino. Tudo isso em um ambiente intuitivo que facilita o gerenciamento e a atualização contínua, garantindo que os docentes tenham uma visão clara de todo o ciclo do curso.</p>
                    </div>
                    <div className="linha-sobre">
                        <div className="bolinha-sobre">
                            <div className="bolinha-dentro"></div>
                        </div>
                        <div className="bolinha-sobre" id="bolinha-sobre2">
                            <div className="bolinha-dentro"></div>
                        </div>
                        <div className="bolinha-sobre" id="bolinha-sobre3">
                            <div className="bolinha-dentro"></div>
                        </div>
                    </div>
                    <div className="crie">
                        <h4>Crie seu plano de ensino em apenas 10 minutos!</h4>
                        <p>Com o nosso sistema, você pode criar um plano de ensino completo
                            em até 10 minutos. Nossa plataforma é prática e intuitiva, permitindo que
                            você economize tempo e se concentre no que realmente importa: o
                            aprendizado dos seus alunos.</p>

                        <div className="acesso">
                            <h4>Acesso colaborativo aos planos de ensino</h4>
                            <p>Com o nosso sistema, os professores têm acesso aos planos de ensino criados por seus colegas, promovendo a colaboração e o compartilhamento de boas práticas. Essa troca de informações facilita o alinhamento pedagógico, aprimorando a qualidade do ensino e permitindo que os docentes se inspirem em diferentes abordagens e estratégias.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sixth">
                <h1>Nossa equipe está extremamente grata por concluir este
                    trabalho com <span className="azul">excelência</span>e em perfeita <span className="azul">harmonia</span>. A colaboração
                    e dedicação de todos foram essenciais para alcançar
                    esse resultado incrível.</h1>
                <div className="buttons-login">
                    <a href="/login"><button>Ir para o login</button></a>
                </div>
                <img src={landingLogo} alt="" />
            </div>
        </section>
    )
}