import React from 'react'
import { Detailpage } from 'interface/gallery'
import { Typography, Tooltip, Chip } from '@material-ui/core'
import { useRouter } from 'next/router'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {},
  })
)
const TagList: React.FC<Pick<Detailpage, 'tagList'>> = ({ tagList }) => {
  const router = useRouter()
  const classes = useStyles()
  return (
    <>
      {tagList.length === 0 && (
        <Typography align="center">
          No tags have been added for this gallery yet.
        </Typography>
      )}
      <table>
        <tbody>
          {tagList.map((o) => (
            <tr key={o.namespace_CHS}>
              <td
                align="right"
                valign="top"
                style={{ lineHeight: '26px', whiteSpace: 'nowrap' }}
              >
                <Tooltip title={o.description} arrow>
                  <span>{o.namespace_CHS}</span>
                </Tooltip>
                :
              </td>
              <td>
                <div>
                  {o.tags.map((v) => (
                    <Tooltip key={v.name} title={v.intro} arrow>
                      <Chip
                        label={v.name_CHS}
                        size="small"
                        variant="outlined"
                        style={{
                          borderStyle: v.dash ? 'dashed' : 'solid',
                          margin: 2,
                        }}
                        classes={{ label: classes.label }}
                        clickable
                        onClick={() => {
                          router.push(`/index?page=0&f_search=${v.keyword}`)
                        }}
                      />
                    </Tooltip>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default TagList