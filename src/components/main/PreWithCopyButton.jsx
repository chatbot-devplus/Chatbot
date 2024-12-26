import { useState } from 'react'

const PreWithCopyButton = ({ content }) => {
  const [buttonText, setButtonText] = useState('Copy')

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setButtonText('Copied!')
      setTimeout(() => {
        setButtonText('Copy')
      }, 5000)
    })
  }

  return (
    <div className="pre-container" style={{ position: 'relative' }}>
      <button
        onClick={handleCopy}
        style={{
          color: '#b7b7b7 ',
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '5px 10px',
          cursor: 'pointer'
        }}
      >
        {buttonText}
      </button>
      <pre>{content}</pre>
    </div>
  )
}

export default PreWithCopyButton
