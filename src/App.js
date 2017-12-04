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

const { Element, Link, scrollSpy } = Scroll;
const menus = ['Home', 'Intro', 'Skills', 'Resume', 'Works'];

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

const SkillsList = (index) => {
  return [[{
    name: 'PHP',
    value: 400
  }, {
    name: 'Mysql',
    value: 300
  }], [{
    name: 'HTML',
    value: 470
  }, {
    name: 'CSS',
    value: 370
  }, {
    name: 'Javascript',
    value: 370
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
            <div className="home-title">
              <div className="home-title-inner">
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
              </div>
            </div>
          </Element>
        </Visibility>

        <Element name="Intro">
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text>
              <Header as='h3' style={{ fontSize: '2em' }}>Breaking The Grid, Grabs Your Attention</Header>
              <p style={{ fontSize: '1.33em' }}>
                Instead of focusing on content creation and hard work, we have learned how to master the art of doing
                nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic
                and worth your attention.
              </p>
            </Container>
          </Segment>
        </Element>

        <Element name="Skills">
          <Segment style={{ padding: '0em' }} vertical inverted>
            <div className="skills">
              <Header as="h3" textAlign="center" inverted style={{ fontSize: '3em' }}>My Skills</Header>
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
            </div>
          </Segment>
        </Element>

        <Element name="Resume">
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text>
              <Header as='h3' style={{ fontSize: '2em' }}>Download my resume here</Header>
            </Container>
          </Segment>
        </Element>

        <Element name="Works">
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
