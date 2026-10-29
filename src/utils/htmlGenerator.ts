import { EmailTemplate, ThemeStyle, Section } from '../types/newsletter';
import { THEMES } from '../data/defaultTemplates';

export function generateEmailHtml(template: EmailTemplate): string {
  const theme = THEMES.find((t) => t.id === template.themeId) || THEMES[0];
  const isSerif = theme.fontFamily === 'serif';
  const fontFamilyCss = isSerif
    ? "'Source Serif 4', Georgia, 'Times New Roman', serif"
    : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const renderSectionHtml = (sec: Section): string => {
    switch (sec.type) {
      case 'header': {
        const d = sec.data;
        const alignStyle = d.align === 'center' ? 'text-align: center;' : d.align === 'split' ? 'text-align: left;' : 'text-align: left;';
        return `
        <!-- HEADER SECTION -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid ${theme.borderColor}; padding: 24px 32px;">
          <tr>
            <td style="${alignStyle}">
              <div style="font-size: 20px; font-weight: 800; letter-spacing: -0.02em; color: ${theme.textColor};">${d.brandName}</div>
              ${d.tagline ? `<div style="font-size: 13px; color: ${theme.mutedColor}; margin-top: 4px;">${d.tagline}</div>` : ''}
            </td>
            ${d.align === 'split' ? `
            <td align="right" style="vertical-align: middle;">
              <span style="font-size: 12px; color: ${theme.mutedColor}; font-weight: 500;">${d.issueDate || ''}</span>
            </td>` : ''}
          </tr>
        </table>`;
      }

      case 'hero': {
        const d = sec.data;
        const textAlign = d.align === 'center' ? 'center' : 'left';
        const bg = d.bgTint === 'subtle' ? `${theme.primaryColor}0d` : d.bgTint === 'accent' ? `${theme.accentColor}18` : d.bgTint === 'dark' ? '#0f172a' : 'transparent';
        const titleColor = d.bgTint === 'dark' ? '#ffffff' : theme.textColor;
        const subtitleColor = d.bgTint === 'dark' ? '#cbd5e1' : theme.mutedColor;

        return `
        <!-- HERO SECTION -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${bg}; padding: 36px 32px; text-align: ${textAlign};">
          <tr>
            <td align="${textAlign}">
              ${d.kicker ? `<div style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: ${theme.primaryColor}; text-transform: uppercase; margin-bottom: 12px;">${d.kicker}</div>` : ''}
              <h1 style="font-size: 30px; line-height: 1.25; font-weight: 800; color: ${titleColor}; margin: 0 0 16px 0; letter-spacing: -0.03em;">${d.title}</h1>
              <p style="font-size: 16px; line-height: 1.6; color: ${subtitleColor}; margin: 0 0 ${d.hasCta ? '24px' : '0'} 0;">${d.subtitle}</p>
              ${d.hasCta ? `
              <div>
                <a href="${d.ctaUrl || '#'}" style="display: inline-block; background-color: ${theme.primaryColor}; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 6px;">${d.ctaText || 'Learn More'}</a>
              </div>` : ''}
            </td>
          </tr>
        </table>`;
      }

      case 'text': {
        const d = sec.data;
        const font = d.fontStyle === 'serif' ? "'Source Serif 4', Georgia, serif" : fontFamilyCss;
        const textAlign = d.align;
        const paragraphs = d.content.split('\n\n').map(p => `<p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.7; color: ${theme.textColor}; font-family: ${font};">${p.replace(/\n/g, '<br/>')}</p>`).join('');

        if (d.isCallout) {
          return `
          <!-- CALLOUT TEXT SECTION -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 16px 32px;">
            <tr>
              <td style="background-color: ${theme.backgroundColor}; border: 1px solid ${theme.borderColor}; border-radius: 8px; padding: 20px 24px;">
                ${d.headline ? `<div style="font-size: 14px; font-weight: 700; color: ${theme.primaryColor}; margin-bottom: 8px;">${d.headline}</div>` : ''}
                <div style="font-size: 14px; line-height: 1.6; color: ${theme.textColor}; font-style: italic;">${paragraphs}</div>
              </td>
            </tr>
          </table>`;
        }

        return `
        <!-- TEXT SECTION -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 24px 32px; text-align: ${textAlign};">
          <tr>
            <td align="${textAlign}">
              ${d.headline ? `<h2 style="font-size: 22px; font-weight: 700; color: ${theme.textColor}; margin: 0 0 14px 0; letter-spacing: -0.02em;">${d.headline}</h2>` : ''}
              ${paragraphs}
            </td>
          </tr>
        </table>`;
      }

      case 'image': {
        const d = sec.data;
        const radius = d.rounded === 'lg' ? '12px' : d.rounded === 'md' ? '8px' : d.rounded === 'none' ? '0px' : '6px';
        return `
        <!-- IMAGE SECTION -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 16px 32px;">
          <tr>
            <td align="center">
              ${d.linkUrl ? `<a href="${d.linkUrl}" target="_blank">` : ''}
              <img src="${d.imageUrl}" alt="${d.alt || 'Newsletter illustration'}" width="100%" style="max-width: 100%; height: auto; display: block; border-radius: ${radius}; border: 1px solid ${theme.borderColor};" />
              ${d.linkUrl ? `</a>` : ''}
              ${d.caption ? `<div style="font-size: 12px; color: ${theme.mutedColor}; margin-top: 8px; text-align: center;">${d.caption}</div>` : ''}
            </td>
          </tr>
        </table>`;
      }

      case 'columns': {
        const d = sec.data;
        const colsHtml = d.items.map(col => `
          <td width="${d.columnCount === 2 ? '50%' : '33.3%'}" valign="top" style="padding: 12px;">
            <div style="background-color: ${theme.backgroundColor}; border: 1px solid ${theme.borderColor}; border-radius: 8px; padding: 20px; height: 100%;">
              ${col.tag ? `<div style="font-size: 11px; font-weight: 600; color: ${theme.primaryColor}; margin-bottom: 6px;">${col.tag}</div>` : ''}
              <div style="font-size: 16px; font-weight: 700; color: ${theme.textColor}; margin-bottom: 8px;">${col.title}</div>
              <div style="font-size: 13px; line-height: 1.5; color: ${theme.mutedColor}; margin-bottom: 12px;">${col.description}</div>
              ${col.linkText ? `<a href="${col.linkUrl || '#'}" style="font-size: 13px; font-weight: 600; color: ${theme.primaryColor}; text-decoration: none;">${col.linkText}</a>` : ''}
            </div>
          </td>
        `).join('');

        return `
        <!-- COLUMNS SECTION -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 16px 20px;">
          ${d.headline ? `<tr><td colspan="${d.items.length}" style="padding: 0 12px 12px 12px;"><h3 style="font-size: 18px; font-weight: 700; color: ${theme.textColor}; margin: 0;">${d.headline}</h3></td></tr>` : ''}
          <tr>
            ${colsHtml}
          </tr>
        </table>`;
      }

      case 'quote': {
        const d = sec.data;
        return `
        <!-- QUOTE SECTION -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 24px 32px;">
          <tr>
            <td style="border-left: 3px solid ${theme.primaryColor}; padding-left: 20px;">
              <blockquote style="margin: 0 0 12px 0; font-size: 16px; line-height: 1.6; font-style: italic; color: ${theme.textColor};">
                “${d.quote}”
              </blockquote>
              <div style="font-size: 13px; font-weight: 700; color: ${theme.textColor};">
                ${d.author} ${d.role ? `<span style="font-weight: 400; color: ${theme.mutedColor};">· ${d.role}${d.company ? `, ${d.company}` : ''}</span>` : ''}
              </div>
            </td>
          </tr>
        </table>`;
      }

      case 'button': {
        const d = sec.data;
        const radius = d.shape === 'pill' ? '9999px' : d.shape === 'square' ? '0px' : '6px';
        const pad = d.size === 'lg' ? '14px 32px' : d.size === 'sm' ? '8px 20px' : '10px 24px';
        const fontSize = d.size === 'lg' ? '15px' : d.size === 'sm' ? '12px' : '14px';
        const isPrimary = d.variant === 'primary';
        const bg = isPrimary ? theme.primaryColor : d.variant === 'secondary' ? theme.backgroundColor : 'transparent';
        const color = isPrimary ? '#ffffff' : theme.textColor;
        const border = d.variant === 'outline' ? `1px solid ${theme.borderColor}` : 'none';

        return `
        <!-- BUTTON SECTION -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 20px 32px; text-align: ${d.align};">
          <tr>
            <td align="${d.align}">
              <a href="${d.url || '#'}" style="display: inline-block; background-color: ${bg}; color: ${color}; border: ${border}; border-radius: ${radius}; font-size: ${fontSize}; font-weight: 600; padding: ${pad}; text-decoration: none; letter-spacing: -0.01em;">
                ${d.text}
              </a>
              ${d.secondaryText ? `<div style="font-size: 11px; color: ${theme.mutedColor}; margin-top: 8px;">${d.secondaryText}</div>` : ''}
            </td>
          </tr>
        </table>`;
      }

      case 'divider': {
        const d = sec.data;
        const pad = d.spacing === 'lg' ? '36px 32px' : d.spacing === 'sm' ? '16px 32px' : '24px 32px';
        if (d.style === 'spacer') {
          return `<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="height: ${d.spacing === 'lg' ? '48px' : '24px'};"><tr><td></td></tr></table>`;
        }
        return `
        <!-- DIVIDER SECTION -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: ${pad};">
          <tr>
            <td style="border-top: 1px ${d.style} ${theme.borderColor}; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>
        </table>`;
      }

      case 'footer': {
        const d = sec.data;
        const socialLinks = Object.entries(d.socials || {})
          .filter(([, url]) => Boolean(url))
          .map(([name, url]) => `<a href="${url}" style="color: ${theme.primaryColor}; text-decoration: none; margin: 0 8px; font-weight: 500;">${name.charAt(0).toUpperCase() + name.slice(1)}</a>`)
          .join('·');

        return `
        <!-- FOOTER SECTION -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid ${theme.borderColor}; background-color: ${theme.backgroundColor}; padding: 32px; text-align: center;">
          <tr>
            <td align="center" style="font-size: 12px; line-height: 1.6; color: ${theme.mutedColor}; font-family: ${fontFamilyCss};">
              <div style="font-weight: 700; color: ${theme.textColor}; margin-bottom: 6px;">${d.companyName}</div>
              <div style="margin-bottom: 12px;">${d.address}</div>
              <div style="margin-bottom: 16px;">${d.unsubscribeNotice}</div>
              ${socialLinks ? `<div style="margin-bottom: 16px;">${socialLinks}</div>` : ''}
              <div style="font-size: 11px; color: ${theme.mutedColor}; opacity: 0.8;">© ${d.copyrightYear} ${d.companyName}. All rights reserved.</div>
            </td>
          </tr>
        </table>`;
      }

      default:
        return '';
    }
  };

  const sectionsMarkup = template.sections.map(renderSectionHtml).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.subject}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    p { margin: 0; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${theme.backgroundColor}; font-family: ${fontFamilyCss};">
  ${template.preheader ? `<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">${template.preheader}</div>` : ''}
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${theme.backgroundColor}; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: ${theme.canvasColor}; border: 1px solid ${theme.borderColor}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <tr>
            <td>
              ${sectionsMarkup}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
