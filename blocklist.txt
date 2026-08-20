! Title: Lyrics Translate Filters by Nikoboi
! Description: Removes copy protection.
! Homepage: https://block.nikoboi.dev/
! Author: Nikoboi
! License: GNU General Public License v3.0 | https://github.com/NikoboiNFTB/Blocklists/blob/main/LICENSE
! Source: https://block.nikoboi.dev/list/lyricstranslate.com
! Issues: https://github.com/NikoboiNFTB/Blocklists/issues
! Pull Requests: https://github.com/NikoboiNFTB/Blocklists/pulls
! Last updated: 2026-08-21 00:01 UTC+03:00
! Expires: 7 days

! ========================================
! Start of Filters
! ========================================

! Both of these just prevent the site from fucking with the copy function.
lyricstranslate.com##+js(aeld, copy)
lyricstranslate.com##+js(aeld, beforecopy)

! Artists in search, because you usually would search for a song.
lyricstranslate.com##div.song-list.search-res__block.block-search-res._artist

! ========================================
! End of Filters
! ========================================
