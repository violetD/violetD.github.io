import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Progress,
  Label,
} from 'semantic-ui-react';
import Scroll from 'react-scroll';
import _ from 'lodash';

const { Element, Link, scrollSpy } = Scroll;
const menus = ['Home', 'Intro', 'Skills', 'Works'];
const works = [{
  'image': require('./assets/images/g1.jpg'),
  'description': '测试的哦'
}]

const FixedMenu = ({activeMenu, setActiveMenu}) => (
  <Menu fixed='top' size='large'>
    <Container>
      {menus.map((menu) => (
        <Menu.Item key={menu} active={activeMenu===menu}><Link spy={true} hashSpy={true} activeClass="active" to={menu} smooth={true} duration={500} onSetActive={() => {
          setActiveMenu(menu);
        }}>{menu}</Link></Menu.Item>
      ))}
    </Container>
  </Menu>
);

const MaskContainer = ({className, children}) => (
  <div className={className}>
    <div className="mask-container" style={{
      background: 'rgba(0,0,0,.3)'
    }}>{children}</div>
  </div>
)

const HeaderDecorate = () => (
  <div style={{
    width: '65px',
    height: '3px',
    margin: '0 auto 2em',
    background: '#56b2e6'
  }}></div>
)

const SkillsList = (index) => {
  return [[{
    name: 'PHP',
    value: 400
  }, {
    name: 'Mysql',
    value: 300
  }, {
    name: 'Shell',
    value: 200
  }], [{
    name: 'HTML',
    value: 470
  }, {
    name: 'CSS',
    value: 370
  }, {
    name: 'Javascript',
    value: 370
  }, {
    name: 'Photoshop',
    value: 170
  }]][index].map((skill) => {
    let p = skill.value/475*100;
    return (
      <List.Item key={skill.name}>
        <List.Header as="h4">{skill.name}</List.Header>
        <Label pointing="below" color="black" style={{ left: `${p}%` }}>{skill.value}</Label>
        <Progress value={skill.value} total="475" color="blue" size="small" />
        <span className="mark-min">0</span>
        <span className="mark-max">475</span>
      </List.Item>
    )
  })
};

export default class HomepageLayout extends Component {

  state = {
    activeMenu: 'Home'
  }

  componentDidMount() {
    scrollSpy.update();
  }

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })

  setActiveMenu = (activeMenu) => {
    this.setState({activeMenu});
  }

  render() {
    const { visible, activeMenu } = this.state

    return (
      <div>
        { visible ? <FixedMenu activeMenu={activeMenu} setActiveMenu={this.setActiveMenu} /> : null }

        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Element name="Home">
            <MaskContainer className="home-title">
              <Segment
                textAlign='center'
                style={{ minHeight: 700, padding: '0em' }}
                vertical
              >
                <div
                  style={{ background: 'rgba(0,0,0,.2)' }}
                >
                  <Container>
                    <Menu inverted pointing secondary size='large'
                      style={{ background: 'transparent', borderColor: 'transparent' }}
                    >
                      {menus.map((menu) => (
                        <Menu.Item key={menu} active={activeMenu===menu}><Link spy={true} hashSpy={true} activeClass="active" to={menu} smooth={true} duration={500} onSetActive={() => {
                          this.setActiveMenu(menu);
                        }}>{menu}</Link></Menu.Item>
                      ))}
                    </Menu>
                  </Container>
                </div>

                <Container text>
                  <Header
                    as='h1'
                    content="Violet's Home"
                    inverted
                    style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
                  />
                  <Header
                    as='h2'
                    content='Just do it.'
                    inverted
                    style={{ fontSize: '1.7em', fontWeight: 'normal' }}
                  />
                  <Button primary size='huge'>
                    Get Understood
                    <Icon name='right arrow' />
                  </Button>
                </Container>
              </Segment>
            </MaskContainer>
          </Element>
        </Visibility>

        <Element name="Intro">
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text style={{ fontSize: '2em' }}>
              <p style={{ lineHeight: '3.5em' }}><Icon name="birthday" /> March 18th, 1988, born in Guiyang, Guizhou, China</p>
              <p style={{ lineHeight: '3.5em' }}><Icon name="university" /> Study in Shanghai University Of Electric Power since 2006</p>
              <p style={{ lineHeight: '3.5em' }}><Icon name="code" /> Work as a web engineer after school</p>
            </Container>
          </Segment>
        </Element>

        <Element name="Skills">
          <Segment style={{ padding: '0em' }} vertical inverted>
            <MaskContainer className="skills">
              <Header as="h3" textAlign="center" inverted style={{ fontSize: '3em' }}>My Skills</Header>
              <HeaderDecorate />
              <Grid columns='equal' stackable>
                <Grid.Row>
                  <Grid.Column>
                    <div style={{ padding: '1em 2em' }}>
                      <List inverted className="skills-list">{SkillsList(0)}</List>
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div style={{ padding: '1em 2em' }}>
                      <List inverted className="skills-list">{SkillsList(1)}</List>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </MaskContainer>
          </Segment>
        </Element>

        <Element name="Works">
          <Container style={{ padding: '4em 0em' }}>
            <Header as="h3" textAlign="center" style={{ fontSize: '3em' }}>My Works</Header>
            <HeaderDecorate />
            <Grid>
              {_.chunk(works, 3).map((items) => {
                return (
                  <Grid.Row columns={3} key={Date()}>
                    {items.map((item) => (
                      <Grid.Column key={item.description} className="works-item">
                        <div style={{
                          position: 'relative',
                          overflow: 'hidden',
                          background: '#F58703',
                        }}>
                          <Image src={item.image} fluid />
                          <div style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                            color: '#fff'
                          }}>
                            <p style={{
                              position: 'absolute',
                              bottom: '0',
                              left: '0',
                              padding: '0.5em 1em'
                            }}>{item.description}</p>
                          </div>
                        </div>
                      </Grid.Column>
                  ))}
                  </Grid.Row>
                )
              })}
            </Grid>
          </Container>
        </Element>

        <Segment inverted vertical style={{ padding: '5em 0em' }}  textAlign='center'>
          <Container text>
            <p>©2017</p>
          </Container>
        </Segment>
      </div>
    )
  }
}
