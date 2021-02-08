const NodeID3 = require('node-id3')
const path = require('path')
const fs = require('fs')
const child = require('child_process')
const { UV_FS_O_FILEMAP } = require('constants')
const os = require('os')

const metaCache = {}

String.prototype.endsWithAny = function (tests) {
  for (let i = 0; i < tests; i++) if (this.endsWith(tests[i])) return true
  return false
}

const metaWriteQueue = []
const processQueue = () => {
  if (metaWriteQueue.length > 0) {
    metaWriteQueue.shift()()
  }
  else {
    setTimeout(processQueue, 10)
  }
}
processQueue()

window.MetaAPI = {
  homeDir: () => {
    return os.homedir()
  },
  drives: () => {
    return new Promise((resolve, reject) => {
      child.exec('wmic logicaldisk get name', (error, stdout) => {
        if (error) return reject(error)
        resolve(
          stdout.split('\r\r\n')
            .filter(value => /[A-Za-z]:/.test(value))
            .map(value => {
              let drive = value.trim()
              if (drive.endsWith(':')) drive += '\\'
              return drive
            })
        )
      })
    })
  },
  readdir: (dir) => {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (err, files) => {
        if (err) return reject(err)
        resolve(files)
      })
    })
  },
  stat: (path) => {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) return reject(err)
        stats.path = path
        resolve(stats)
      })
    })
  },
  getFolders: (dir) => {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, async (err, files) => {
        if (err) return reject(err)
        let stats = []
        for (let i = 0; i < files.length; i++) {
          stats.push(window.MetaAPI.stat(path.join(dir,files[i])))
        }
        await Promise.all(stats).catch((err) => {
          
        })
        let folders = []
        for (let i = 0; i < stats.length; i++) {
          try {
            let stat = await stats[i]
            if (stat.isDirectory()) folders.push(stat.path)
          } catch (err) {
            console.error(err)
          }
        }
        resolve(folders)
      })
    })
  },
  /**
   * @returns {String[]}
   * @param {String} dir 
   */
  getFiles: (dir, endsWith = "") => {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, async (err, _files) => {
        if (err) return reject(err)
        let stats = []
        for (let i = 0; i < _files.length; i++) {
          stats.push(window.MetaAPI.stat(path.join(dir, _files[i])))
        }
        await Promise.all(stats).catch((err) => {
          
        })
        let files = []
        for (let i = 0; i < stats.length; i++) {
          try {
            let stat = await stats[i]
            if (stat.isFile() && stat.path.endsWith(endsWith)) files.push(stat.path)
          } catch (err) {
            console.error(err)
          }
        }
        resolve(files)
      })
    })
  },
  getName: (_path) => {
    return path.basename(_path)
  },
  getMeta: (file) => {
    return new Promise((resolve, reject) => {
      if (metaCache[file]) {
        Promise.resolve(metaCache[file]).then((value) => {
          resolve(value)
        }).catch((err) => reject(err))
        return
      }
      let res, rej;
      metaCache[file] = new Promise((resolve, reject) => {
        res = resolve
        rej = reject
      })
      NodeID3.read(file, (err, tags) => {
        if (err) {
          rej(err)
          reject(err)
          return
        }
        res(tags)
        resolve(tags)
        metaCache[file] = undefined
      })
    })
  },
  setMeta: (file, tags) => {
    return new Promise((resolve, reject) => {
      metaWriteQueue.push(() => {
        processQueue()
      })
    })
  }
}
