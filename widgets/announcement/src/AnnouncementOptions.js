import React, { Component } from 'react'
import { Form, Input, InlineInputGroup, Switch } from '../../../components/Form'
import AnnouncementContent from './AnnouncementContent'

class AnnouncementOptions extends Component {
  constructor(props) {
    super(props)
    const { 
      headline,
      iconUrl,
      gradientStart,
      gradientEnd,
      textColor,
      dateColor,
      timeColor,
      fontSize,
      showIcon,
      showDate,
      textShadow
    } = props.data || {}

    this.state = {
      headline: headline || 'ברוכים הבאים לחיל החימוש 20',
      iconUrl: iconUrl || 'https://th.bing.com/th/id/OIP.vL-OqvfwluEegJV6KunAugHaHa?w=188&h=187&c=7&r=0&o=5&pid=1.7',
      gradientStart: gradientStart || 'rgb(26, 37, 69)',
      gradientEnd: gradientEnd || '#00c2ff',
      textColor: textColor || '#ffffff',
      dateColor: dateColor || '#ffffff',
      timeColor: timeColor || '#ffffff',
      showIcon: showIcon !== undefined ? showIcon : true,
      showDate: showDate !== undefined ? showDate : true,
      textShadow: textShadow !== undefined ? textShadow : true,
      fontSize: fontSize || {
        headline: 36,
        time: 36,
        date: 15
      }
    }
  }

  handleChange = (name, value) => {
    const { onChange = () => {} } = this.props
    this.setState(
      {
        [name]: value
      },
      () => {
        onChange(this.state)
      }
    )
  }

  handleFontSizeChange = (type, value) => {
    const { onChange = () => {} } = this.props
    this.setState(
      prevState => ({
        fontSize: {
          ...prevState.fontSize,
          [type]: parseInt(value, 10)
        }
      }),
      () => {
        onChange(this.state)
      }
    )
  }

  render() {
    const {
      headline,
      iconUrl,
      gradientStart,
      gradientEnd,
      textColor,
      dateColor,
      timeColor,
      fontSize,
      showIcon,
      showDate,
      textShadow
    } = this.state

    return (
      <div className="container">
        <Form>
          <h3>Widget: Announcement</h3>
          <p>Customize your announcement banner.</p>

          <Input
            inline={false}
            label="Headline Text"
            type="text"
            name="headline"
            value={headline}
            onChange={this.handleChange}
          />

          <h4>Display Options</h4>
          <InlineInputGroup>
            <Switch
              label="Show Icon"
              name="showIcon"
              checked={showIcon}
              onChange={this.handleChange}
            />
            <Switch
              label="Show Date/Time"
              name="showDate"
              checked={showDate}
              onChange={this.handleChange}
            />
            <Switch
              label="Text Shadow"
              name="textShadow"
              checked={textShadow}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          {showIcon && (
            <Input
              inline={false}
              label="Icon URL"
              type="text"
              name="iconUrl"
              value={iconUrl}
              onChange={this.handleChange}
            />
          )}

          <h4>Colors</h4>
          <InlineInputGroup>
            <Input
              inline={false}
              label="Gradient Start"
              type="color"
              name="gradientStart"
              value={gradientStart}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label="Gradient End"
              type="color"
              name="gradientEnd"
              value={gradientEnd}
              onChange={this.handleChange}
            />
          </InlineInputGroup>

          <InlineInputGroup>
            <Input
              inline={false}
              label="Headline Color"
              type="color"
              name="textColor"
              value={textColor}
              onChange={this.handleChange}
            />
            {showDate && (
              <>
                <Input
                  inline={false}
                  label="Time Color"
                  type="color"
                  name="timeColor"
                  value={timeColor}
                  onChange={this.handleChange}
                />
                <Input
                  inline={false}
                  label="Date Color"
                  type="color"
                  name="dateColor"
                  value={dateColor}
                  onChange={this.handleChange}
                />
              </>
            )}
          </InlineInputGroup>

          <h4>Font Sizes</h4>
          <InlineInputGroup>
            <Input
              inline={false}
              label="Headline Size"
              type="number"
              min="12"
              max="72"
              value={fontSize.headline}
              onChange={(name, value) => this.handleFontSizeChange('headline', value)}
            />
            {showDate && (
              <>
                <Input
                  inline={false}
                  label="Time Size"
                  type="number"
                  min="12"
                  max="72"
                  value={fontSize.time}
                  onChange={(name, value) => this.handleFontSizeChange('time', value)}
                />
                <Input
                  inline={false}
                  label="Date Size"
                  type="number"
                  min="8"
                  max="36"
                  value={fontSize.date}
                  onChange={(name, value) => this.handleFontSizeChange('date', value)}
                />
              </>
            )}
          </InlineInputGroup>
        </Form>

        <div className="previewContainer">
          <p>Preview</p>
          <div className="preview">
            <AnnouncementContent data={this.state} />
          </div>
        </div>

        <style jsx>{`
          h3,
          h4,
          p {
            font-family: 'Open Sans', sans-serif;
            margin: 0;
          }
          h3 {
            margin-bottom: 10px;
          }
          h4 {
            margin: 20px 0 10px;
          }
          p {
            opacity: 0.8;
            margin-bottom: 20px;
          }
          .container {
            display: flex;
            flex-direction: row;
          }
          .preview {
            display: block;
            width: 240px;
            height: 240px;
            border-radius: 6px;
            overflow: hidden;
          }
          .previewContainer {
            margin-left: 16px;
            width: 240px;
          }
        `}</style>
      </div>
    )
  }
}

export default AnnouncementOptions
